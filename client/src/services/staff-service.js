import http from "../config/httpHelper";

const httpRequests = {
  getRequests: (data) => http.get(`/requests?${data}`),
  patchRequests: (id, data) => http.patch(`/requests/${id}/status`, data),
};

export default httpRequests;
