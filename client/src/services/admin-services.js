import http from "../config/httpHelper";

const httpRequests = {
  getUsers: (data) => http.get(`/admin/users?role=${data}`),
  patchUser: (data) => http.patch('/admin/users', data),
  deleteUser: (data) => http.delete(`/admin/users/${data}`)
};

export default httpRequests;
