const _apiUrl = "/api/meeting";

export const createMeeting = (meeting) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meeting),
  }).then((res) => res.json);
};

export const getMeetingsByClient = (clientId) => {
  return fetch(`${_apiUrl}/${clientId}`).then((res) => res.json());
};

export const deleteMeeting = (id) => {
  return fetch(`${_apiUrl}/${id}`, {method: "DELETE"});
};

export const updateMeeting = (id, meeting) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingTime: meeting.meetingTime }),
  });
};
