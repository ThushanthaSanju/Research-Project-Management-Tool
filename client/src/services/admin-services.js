import http from "../config/httpHelper";

const httpRequests = {
  getUsers: (data) => http.get(`/admin/users?role=${data}`),
  getSubmissionTypes: () => http.get("/admin/submissions"),
  getMarkingSchemas: () => http.get("/admin/marking-schemas"),
  getGroups: () => http.get("/admin/groups"),
  getPanels: () => http.get("/admin/panels"),
  getDocuments: () => http.get("/admin/documents"),
  postSubmissionTypes: (data) => http.post("/admin/submissions", data),
  postMarkingSchemas: (data, config) =>
    http.post("/admin/marking-schemas", data, config),
  postPanel: (data) => http.post("/admin/panels", data),
  postDocument: (data, config) => http.post("/admin/documents", data, config),
  patchUser: (data) => http.patch("/admin/users", data),
  patchPanel: (id, data) =>
    http.patch(`/admin/groups/${id}/allocate-panel`, data),
  deleteUser: (data) => http.delete(`/admin/users/${data}`),
};

export default httpRequests;
