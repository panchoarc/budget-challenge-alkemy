import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
});
axiosClient.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axiosClient;
