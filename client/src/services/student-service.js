import http from "../config/httpHelper";

const httpRequests = {
  getProfile: (data) => http.get(`/students/profile/${data}`),
  getStudents: () => http.get('/students'),
  getSubmissionTypes: () => http.get('/students/submissions'),
  postGroup: (data) => http.post('/students/groups', data),
  postResearchTopic: (data) => http.post('/research-topics', data),
  postRequest: (data) => http.post('/requests', data),
  postSubmission: (data, config) => http.post('/students/submissions', data, config),
};

export default httpRequests;
