import { useState, useEffect } from "react";
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { tryGetLoggedInUser } from "../managers/authManager";
import { deleteMeeting, getMeetingsByClient, updateMeeting } from "../managers/meetingManager";

export default function Meetings() {
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [updateAMeeting, setUpdateAMeeting] = useState("");

  const deleteHandler = (meetingId) => {
    deleteMeeting(meetingId).then(() => {
      getYourMeetings();
    });
  };

  const updateHander = (id) => {
    if (!updateMeeting) return;
    updateMeeting(id, { meetingTime: updateAMeeting }).then(() => {
      getYourMeetings();
      setEditingMeetingId(null);
      setUpdateAMeeting("");
    });
  };
  
  const getYourMeetings = async () => {
    const user = await tryGetLoggedInUser();
    getMeetingsByClient(user.clientId).then(setMeetings);
  }

  useEffect(() => {
    getYourMeetings();
  }, []);

  return (
    <Card
      style={{
        backgroundColor: "rgba(200, 200, 200, 0.4)", 
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <CardBody>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Meetings
        </h2>

        <ListGroup flush>
      {meetings.map((c) => (
        <ListGroupItem
          key={c.id}
          style={{
            marginBottom: "8px",
            padding: "12px 16px",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "0.2s",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.8)")
          }
        >
          <div style={{ flex: "1 1 100%", marginBottom: "6px" }}>
            <strong>WHEN:</strong> {c.meetingTime}
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <strong>WITH:</strong> {c.agent.firstName} {c.agent.lastName}
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <strong>LAW:</strong> {c.lawPractice.type}
          </div>
          <div style={{ flex: "1 1 100%", marginTop: "4px" }}>
            <strong>REGARDING:</strong> {c.consultingOn}
          </div>

          <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
            {editingMeetingId === c.id ? (
              <>
                <input
                  type="datetime-local"
                  value={updateAMeeting}
                  onChange={(e) => setUpdateAMeeting(e.target.value)}
                  style={{ height: "30px", borderRadius: "6px", padding: "2px 6px" }}
                />
                <Button
                  color="success"
                  size="sm"
                  onClick={() => updateHander(c.id)}
                  style={{ borderRadius: "6px" }}
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
                    // convert to proper datetime-local format if needed
                    const dt = new Date(c.meetingTime);
                    const formatted = dt.toISOString().slice(0, 16);
                    setUpdateAMeeting(formatted);
                  }}
                  style={{ borderRadius: "6px" }}
                >
                  Update
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => deleteHandler(c.id)}
                  style={{ borderRadius: "6px" }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </ListGroupItem>
      ))}
      </ListGroup>
      </CardBody>
    </Card>
  );
}