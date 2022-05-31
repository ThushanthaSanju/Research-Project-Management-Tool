import http from "../config/httpHelper";

const httpRequests = {
  getRequests: (data) => http.get(`/requests/me?${data}`),
  getDocuments: () => http.get('/users/students/groups'),
  getGroupSubmissions: () => http.get('/documents/groups/my-panel'),
  getPanelGroups: () => http.get('/documents/groups/my-panel'),
  getGroups: () => http.get('/staff/groups'),
  patchRequests: (id, data) => http.patch(`/requests/${id}/groups/status`, data),
  patchResearchTopic: (id, data) => http.patch(`/research-topics/${id}/panels`, data),
};

export default httpRequests;
