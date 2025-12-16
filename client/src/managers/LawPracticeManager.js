const _apiUrl = "/api/law";

export const getLawPractices = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getLawPracticeAgents = (lawPracticeId) => {
  return fetch(`${_apiUrl}/${lawPracticeId}`).then((res) => res.json());
};