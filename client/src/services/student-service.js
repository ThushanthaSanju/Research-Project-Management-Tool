import http from "../config/httpHelper";

const httpRequests = {
  getProfile: (data) => http.get(`/students/profile/${'6282621b7a37d161a46c0680'}`),
  getStudents: () => http.get('/students'),
  postGroup: (data) => http.post('/students/groups', data)
};

export default httpRequests;
