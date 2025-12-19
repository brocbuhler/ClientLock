import { tryGetLoggedInUser } from "./authManager";

const _apiUrl = "/api/meeting";

export const createMeeting = async (meeting) => {
  const user = await tryGetLoggedInUser();
  const res = await fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`,
    },
    body: JSON.stringify(meeting)
  });
  return res.json();
};


export const getMeetingsByClient = (clientId) => {
  return fetch(`${_apiUrl}/client/${clientId}`).then((res) => res.json());
};

export const getMeetingsByAgent = (agentId) => {
  return fetch(`${_apiUrl}/agent/${agentId}`).then((res) => res.json());
};

export const deleteMeeting = (id) => {
  return fetch(`${_apiUrl}/${id}`, {method: "DELETE" });
};

export const updateMeeting = (id, meeting) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingTime: meeting.meetingTime }),
  });
};
