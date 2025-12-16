import { Route, Routes, useLocation } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import AgentPage from "./AgentPage";
import LawServicePage from "./LawServicePage";
import MeetingView from "./MeetingView";
import MeetingForm from "./MeetingForm";
import { useState, useEffect } from "react";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
const [filteredAgents, setFilteredAgents] = useState(null);
const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/agent") {
      setFilteredAgents(null);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="agent"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AgentPage filteredAgents={filteredAgents} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="law-service"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <LawServicePage setFilteredAgents={setFilteredAgents} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="meeting"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MeetingView/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="meeting-form"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MeetingForm/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
        
      </Route>
      
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}