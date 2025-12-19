import { useState, useEffect } from "react";
import { Badge, Button, Card, CardBody, ListGroupItem } from "reactstrap";
import { getAgents } from "../managers/agentManager";
import { getLawPracticeAgents, getLawPractices } from "../managers/lawPracticeManager";
import { useNavigate } from "react-router-dom";
import { tryGetLoggedInUser } from "../managers/authManager";

export default function Agents({ filteredAgents, setMeetingAgent }) {
  const [agents, setAgents] = useState([]);
  const [laws, setLaws] = useState([]);
  const [dropDownAgents, setDropDownAgents] = useState([]);
  const [clientMode, setClientMode] = useState(false)
  const navigate = useNavigate();

  const clientToggle = async () => {
    const user = await tryGetLoggedInUser()
    if (user.clientId == null)
    {
      setClientMode(false)
    } else {
      setClientMode(true)
    }
  };

  const meetingHandler = (agent) => {
    setMeetingAgent(agent);
    navigate("/meeting-form");
  };

  const dropDownFilter = (id) => {
    if (!id) {
      setDropDownAgents([]);
      return;
    }
    getLawPracticeAgents(id).then((agents) => {
      const filtered = agents.map((alp) => alp.agent);
      setDropDownAgents(filtered);
    });
  }
  
  useEffect(() => {
    clientToggle();
    getLawPractices().then(setLaws);
    if (filteredAgents) {
      setAgents(filteredAgents)
    } else if (dropDownAgents.length > 0) {
      setAgents(dropDownAgents)
    } else {
    getAgents().then(setAgents)};
  }, [filteredAgents, dropDownAgents]);

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
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Agents
        </h2>
        {!filteredAgents && (
          <div style={{ marginBottom: "1rem" }}>
            <select
              className="form-select"
              defaultValue=""
              onChange={(e) => dropDownFilter(e.target.value)}
            >
              <option value="">All Agents</option>
              {laws.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.type}
                </option>
              ))}
            </select>
          </div>
        )}
      <CardBody>
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
              {c.image && (
                <img
                  src={c.image}
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "6px",
                    marginBottom: "6px",
                  }}
                />
              )}
              <div>{c.phone}</div>
              <div>{c.email}</div>
              <div style={{ marginTop: "6px" }}>
              {c.agentLawPractices?.map((alp) => (
                <Badge
                  key={alp.lawPractice.id}
                  color="success"
                  pill
                  style={{ marginRight: "6px" }}
                >
                  {alp.lawPractice.type}
                </Badge>
              ))}
              </div>
            </div>
            {clientMode && (
            <Button color="danger" size="sm" onClick={() => meetingHandler(c)}>
              Schedule A Meeting!
            </Button>
          )}
          </ListGroupItem>
        ))}
      </CardBody>
    </Card>
  );
}
