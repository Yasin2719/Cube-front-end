import axios from "axios";

console.log("entrer");
let url = {dev: "http://localhost:3005/"};
console.log(url.dev);
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