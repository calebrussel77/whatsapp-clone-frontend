import axios from "axios";
// import authToken from '../shared/authToken';

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "content-type": "application/json",
    // Authorization: authToken() ? `Bearer ${authToken()}` : undefined,
  },
});

export default axiosInstance;
