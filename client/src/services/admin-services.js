import http from "../config/httpHelper";

const httpRequests = {
  getUsers: () => http.get("/admin/users"),
};

export default httpRequests;
