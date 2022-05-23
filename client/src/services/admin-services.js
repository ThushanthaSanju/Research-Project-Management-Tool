import http from "../config/httpHelper";

const httpRequests = {
  getUsers: (data) => http.get(`/admin/users?role=${data}`),
  getSubmissionTypes: () => http.get('/admin/submissions'),
  getMarkingSchemas: () => http.get('/admin/marking-schemas'),
  postSubmissionTypes: (data) => http.post('/admin/submissions', data),
  postMarkingSchemas: (data, config) => http.post('/admin/marking-schemas', data, config),
  patchUser: (data) => http.patch('/admin/users', data),
  deleteUser: (data) => http.delete(`/admin/users/${data}`)
};

export default httpRequests;
