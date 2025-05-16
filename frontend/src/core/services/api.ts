import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const renewToken = () => api.get("/auth/renew",{withCredentials:true});

export default api;
