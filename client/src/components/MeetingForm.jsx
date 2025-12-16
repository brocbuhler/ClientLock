import React, { useState } from 'react'
import { createMeeting } from '../managers/meetingManager'
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'reactstrap';
import { tryGetLoggedInUser } from '../managers/authManager';

export default function MeetingForm({ meetingAgent }) {
  const [meetingTime, setMeetingTime] = useState("");
  const [consultingOn, setConsultingOn] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!meetingAgent) {
    console.warn("No agent selected");
    navigate("/");
    return;
  }

    const user = await tryGetLoggedInUser();
    const meetingToSchedule = {
      meetingTime,
      consultingOn,
      agentId: meetingAgent.id,
      clientId: user?.id,
      lawPracticeId: meetingAgent.lawPracticeId
    };
    createMeeting(meetingToSchedule).then(() => {
      navigate("/");
    });
  }

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
          <Button color="success" onClick={submitHandler}>Submit</Button>
        </ListGroupItem>
        </>
  )
}
