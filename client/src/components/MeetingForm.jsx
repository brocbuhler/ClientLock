import React, { useEffect, useState } from 'react'
import { createMeeting } from '../managers/meetingManager'
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'reactstrap';
import { tryGetLoggedInUser } from '../managers/authManager';
import { getAgentLawPractices } from '../managers/lawPracticeManager';

export default function MeetingForm({ meetingAgent }) {
  const [meetingTime, setMeetingTime] = useState("");
  const [consultingOn, setConsultingOn] = useState("");
  const [lawPracticeList, setLawPracticeList] = useState([]);
  const [lawPracticeDropDownId, setLawPracticeDropDownId] = useState(0);
  const navigate = useNavigate();

  const agentKicker = async () => {
    const user = await tryGetLoggedInUser();
    if (user.agentId !== null)
    {
      navigate("/");
    }
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!meetingAgent) {
      console.warn("No agent selected");
      navigate("/");
      return;
    }

    if (!lawPracticeDropDownId) {
      alert("Please select a law practice");
      return;
    }

    const user = await tryGetLoggedInUser();
    const meetingToSchedule = {
      meetingTime: meetingTime,
      consultingOn: consultingOn,
      agentId: meetingAgent.id,
      clientId: user?.clientId,
      lawPracticeId: lawPracticeDropDownId
    };
    createMeeting(meetingToSchedule);
    navigate("/meeting");
  };


    useEffect(() => {
      agentKicker();
      getAgentLawPractices(meetingAgent.id).then(setLawPracticeList);
    }, [meetingAgent]);

  return (
    <>
    <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
      Schedule A Meeting
    </h2>
    <ListGroupItem
          style={{
            marginTop: "10px",
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="datetime-local"
            className="form-control"
            style={{ flex: 1 }}
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Consulting On"
            className="form-control"
            style={{ flex: 1 }}
            value={consultingOn}
            onChange={(e) => setConsultingOn(e.target.value)}
          />
          <div style={{ marginBottom: "1rem" }}>
            <select
              className="form-select"
              defaultValue=""
              onChange={(e) => setLawPracticeDropDownId(Number(e.target.value))}
            >
              <option value="">Law Options</option>
              {lawPracticeList.map((l) => (
                <option key={l.id} value={l.lawPractice.id}>
                  {l.lawPractice.type}
                </option>
              ))}
            </select>
          </div>
          <Button color="success" type="button" onClick={submitHandler}>Submit</Button>
        </ListGroupItem>
        </>
  )
}
