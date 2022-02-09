import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5010",
  withCredentials: true,
});

export default axiosInstance;
