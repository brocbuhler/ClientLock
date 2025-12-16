import { useState, useEffect } from "react";
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { getAgents } from "../managers/agentManager";

export default function Agents() {
  const [agents, setAgents] = useState([]);

  const getAllAgents = () => {
    getAgents().then(setAgents);
  };

  const meetingHandler = () => {
    console.warn("MeetingScheduled");
  };
  
  useEffect(() => {
    getAllAgents();
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
          Agents
        </h2>
        {agents.map((c) => (
          <ListGroupItem
            key={c.id}
            style={{
              marginBottom: "8px",
              padding: "12px 16px",
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <div><strong>{c.firstName} {c.lastName}</strong></div>
              <div>{c.phone}</div>
              <div>{c.email}</div>
              <div>{c.image}</div>
            </div>

            <Button
              color="danger"
              size="sm"
              onClick={() => meetingHandler(c.id)}
            >
              Schedule A Meeting!
            </Button>
          </ListGroupItem>
        ))}
      </CardBody>
    </Card>
  );
}