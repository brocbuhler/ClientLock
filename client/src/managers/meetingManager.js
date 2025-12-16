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