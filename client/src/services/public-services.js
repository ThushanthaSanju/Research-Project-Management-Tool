import http from "../config/httpHelper";

const httpRequests = {
    // users
    register: (data) => http.post("/users", data),
    login: (data) => http.post('/users/login', data),
    logout: () => http.post('/users/logout'),
    readGroupName: (id) => http.get(`/users/students/groups/${id}`)
};

export default httpRequests;