import axios from "axios";

let url = {dev: "http://localhost:3005/"};
const api = axios.create({
    withCredentials: true,
    baseURL: url.dev,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    }
    
});

export const fetcher = url => api.get(url).then(res => res.data);

export default api;