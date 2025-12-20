import { useState, useEffect } from "react";
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { tryGetLoggedInUser } from "../managers/authManager";
import { getAgentLawPractices } from "../managers/LawPracticeManager";
import {
  deleteMeeting,
  getMeetingsByAgent,
  getMeetingsByClient,
  updateMeeting,
  updateMeetingTime,
} from "../managers/meetingManager";

export default function Meetings() {
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [clientMode, setClientMode] = useState(false);
  const [updateAMeetingTime, setUpdateAMeetingTime] = useState("");
  const [updateConsultingOn, setUpdateConsultingOn] = useState("");
  const [lawPracticeDropDownId, setLawPracticeDropDownId] = useState(0);
  const [lawPracticeList, setLawPracticeList] = useState([]);

  const clientToggle = async () => {
    const user = await tryGetLoggedInUser();
    setClientMode(user.clientId !== null);
  };

  const deleteHandler = (meetingId) => {
    deleteMeeting(meetingId).then(getYourMeetings);
  };

  const updateHander = (id) => {
    if (clientMode) {
      const update = {
        meetingTime: updateAMeetingTime,
        consultingOn: updateConsultingOn,
        lawPracticeId: lawPracticeDropDownId,
      };

      updateMeeting(id, update).then(() => {
        getYourMeetings();
        setEditingMeetingId(null);
        setUpdateAMeetingTime("");
        setUpdateConsultingOn("");
        setLawPracticeDropDownId(0);
      });
    } else {
      if (!updateAMeetingTime) return;

      updateMeetingTime(id, { meetingTime: updateAMeetingTime }).then(() => {
        getYourMeetings();
        setEditingMeetingId(null);
        setUpdateAMeetingTime("");
      });
    }
  };

  const getYourMeetings = async () => {
    const user = await tryGetLoggedInUser();
    if (user.clientId !== null) {
      getMeetingsByClient(user.clientId).then(setMeetings);
    } else if (user.agentId !== null) {
      getMeetingsByAgent(user.agentId).then(setMeetings);
    }
  };

  const listGrabber = (agentId) => {
    console.warn(agentId);
    getAgentLawPractices(agentId).then(setLawPracticeList);
  };

  useEffect(() => {
    clientToggle();
    getYourMeetings();
  }, []);

  return (
    <Card
      style={{
        backgroundColor: "rgba(200, 200, 200, 0.4)",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "700px",
        margin: "20px auto",
      }}
    >
      <CardBody>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Meetings
        </h2>

        <ListGroup flush>
          {meetings.map((c) => {
            const isClientEditing =
              clientMode && editingMeetingId === c.id;

            return (
              <ListGroupItem
                key={c.id}
                style={{
                  marginBottom: "10px",
                  padding: isClientEditing ? "20px" : "12px 16px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div>
                  <strong>WHEN:</strong> {c.meetingTime}
                </div>
                <div>
                  <strong>WITH:</strong> Agent {c.agent.firstName}{" "}
                  {c.agent.lastName} & Client {c.client.firstName}{" "}
                  {c.client.lastName}
                </div>
                <div>
                  <strong>LAW:</strong> {c.lawPractice.type}
                </div>
                <div>
                  <strong>REGARDING:</strong> {c.consultingOn}
                </div>

                {!clientMode ? (
                  editingMeetingId === c.id ? (
                    <>
                      <input
                        type="datetime-local"
                        value={updateAMeetingTime}
                        onChange={(e) =>
                          setUpdateAMeetingTime(e.target.value)
                        }
                        className="form-control"
                      />
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => updateHander(c.id)}
                      >
                        Submit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => {
                          setEditingMeetingId(c.id);
                          const dt = new Date(c.meetingTime);
                          setUpdateAMeetingTime(
                            dt.toISOString().slice(0, 16)
                          );
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => deleteHandler(c.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )
                ) : editingMeetingId === c.id ? (
                  <>
                    <input
                      type="datetime-local"
                      value={updateAMeetingTime}
                      onChange={(e) =>
                        setUpdateAMeetingTime(e.target.value)
                      }
                      className="form-control"
                    />

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Consulting On"
                      value={updateConsultingOn}
                      onChange={(e) =>
                        setUpdateConsultingOn(e.target.value)
                      }
                    />

                    <select
                      className="form-select"
                      onChange={(e) =>
                        setLawPracticeDropDownId(
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value="">Law Options</option>
                      {lawPracticeList.map((l) => (
                        <option
                          key={l.id}
                          value={l.lawPractice.id}
                        >
                          {l.lawPractice.type}
                        </option>
                      ))}
                    </select>

                    <Button
                      color="success"
                      size="sm"
                      onClick={() => updateHander(c.id)}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        setEditingMeetingId(c.id);
                        const dt = new Date(c.meetingTime);
                        setUpdateAMeetingTime(
                          dt.toISOString().slice(0, 16)
                        );
                        setUpdateConsultingOn(c.consultingOn);
                        listGrabber(c.agent.id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => deleteHandler(c.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </CardBody>
    </Card>
  );
}
