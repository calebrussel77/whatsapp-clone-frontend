import axios from "axios";
import authToken from "../shared/authToken";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    Authorization: authToken() ? `Bearer ${authToken()}` : undefined,
  },
});

export default axiosInstance;
