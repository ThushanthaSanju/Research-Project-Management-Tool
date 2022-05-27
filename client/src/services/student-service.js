import http from "../config/httpHelper";

const httpRequests = {
  // users
  getProfile: () => http.get(`/users/me`),
  getStudents: () => http.get('/users/students'),
  // submission types
  getSubmissionTypes: () => http.get('/submissions'),
  postSubmission: (data, config) => http.post('/users/students/groups/submissions', data, config),
  // groups
  postGroup: (data) => http.post('/users/students/groups', data),
  // documents
  getTemplates: () => http.get('/documents/templates'),
  // research topics
  postResearchTopic: (data) => http.post('/research-topics/groups', data),
  // requests
  postRequest: (data) => http.post('/requests/staff', data),
  postRequestStatus: () => http.post('/requests/groups/status'),
  patchResearchTopic: (data) => http.patch(`/research-topics/${data._id}`, data),
};

export default httpRequests;
