import http from "../config/httpHelper";

const httpRequests = {
    register: (data) => http.post("/users", data),
    login: (data) => http.post('/users/login', data),
    logout: () => http.post('/users/logout')
};

export default httpRequests;