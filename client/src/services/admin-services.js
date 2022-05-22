import http from "../config/httpHelper";

const httpRequests = {
  getUsers: (data) => http.get(`/admin/users?role=${data}`),
  getSubmissionTypes: () => http.get('/admin/submissions'),
  postSubmissionTypes: (data) => http.post('/admin/submissions', data),
  patchUser: (data) => http.patch('/admin/users', data),
  deleteUser: (data) => http.delete(`/admin/users/${data}`)
};

export default httpRequests;
