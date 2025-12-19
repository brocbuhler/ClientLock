const _apiUrl = "/api/law";

export const getLawPractices = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getLawPracticeAgents = (lawPracticeId) => {
  return fetch(`${_apiUrl}/practice/${lawPracticeId}`).then((res) => res.json());
};

export const getAgentLawPractices = (agentId) => {
  return fetch(`${_apiUrl}/agent/${agentId}`).then((res) => res.json());
};