const _apiUrl = "/api/agent";

export const getAgents = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
