import axios from "axios"

const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API || 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;

