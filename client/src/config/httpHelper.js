import Axios from 'axios';

const http = Axios.create({
    baseURL: `${process.env.REACT_APP_API}/api`,
    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
})

export default http;