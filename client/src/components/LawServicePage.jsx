import { useState, useEffect } from "react";
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { getLawPracticeAgents, getLawPractices } from "../managers/lawPracticeManager";

export default function Law() {
  const [lawPractices, setLawPractices] = useState([]);
  const [lawPracticeAgents, setLawPracticeAgents ] = useState([]);
  const getAllLawPractices = () => {
    getLawPractices().then(setLawPractices);
  };

  const seeAgentsHandler = (id) => {
    getLawPracticeAgents(id).then(setLawPracticeAgents)
    console.warn(lawPracticeAgents);
  };
  
  useEffect(() => {
    getAllLawPractices();
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
          Law
        </h2>
        {lawPractices.map((c) => (
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
              <div><strong>{c.type}</strong></div>
              <div>{c.description}</div>
            </div>

            <Button
              color="danger"
              size="sm"
              onClick={() => seeAgentsHandler(c.id)}
            >
              See Agents
            </Button>
          </ListGroupItem>
        ))}
      </CardBody>
    </Card>
  );
}