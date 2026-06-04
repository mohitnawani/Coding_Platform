import axios from "axios"

const backendURL = import.meta.env.VITE_BACKEND_API || 'http://localhost:3000';

const axiosClient = axios.create({
    baseURL: backendURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;
