import http from "../config/httpHelper";

const httpRequests = {
    register: (data) => http.post("/users", data),
};

export default httpRequests;