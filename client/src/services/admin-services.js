import http from "../config/httpHelper";

const httpRequests = {
  // users
  getUsers: (data) => http.get(`/users?role=${data}`),
  patchUser: (id, data) => http.patch(`/users/${id}`, data),
  deleteUser: (id) => http.delete(`/users/${id}`),
  // panel
  getPanels: () => http.get("/users/staff/panels"),
  patchPanel: (id, data) => http.patch(`/users/students/groups/${id}/allocate-panel`, data),
  postPanel: (data) => http.post("/users/staff/panels", data),
  // submission types
  getSubmissionTypes: () => http.get("/submissions"),
  postSubmissionTypes: (data) => http.post("/submissions", data),
  // groups
  getGroups: () => http.get("/users/students/groups"),
  // marking schemas
  getMarkingSchemas: () => http.get("/marking-schemas"),
  postMarkingSchemas: (data, config) => http.post("/marking-schemas", data, config),
  // document
  getDocuments: () => http.get("/documents"),
  postDocument: (data, config) => http.post("/documents", data, config),
};

export default httpRequests;
