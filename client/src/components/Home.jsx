import React from 'react';
import { Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const agentBtn = () => {
    navigate("/agent");
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "70vh" }}
    >
      <h1 className="mb-3">Welcome to ClientLock</h1>

      <p className="text-muted mb-4">
        A simple and secure way to schedule meetings with trusted agents.
      </p>

      <Button
        color="danger"
        size="lg"
        onClick={agentBtn}
      >
        See Agents Now!
      </Button>
    </Container>
  );
}
