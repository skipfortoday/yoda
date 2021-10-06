import axios from "axios";
import auth from "./auth"

const token = sessionStorage.getItem('token')
const newToken = localStorage.getItem('token');
console.log("token apibackend", token);
const axiosBackend = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_ENDPOINT_PROD,
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT_DEV,
  headers: {
    // Authorization: auth.token == null ? null : `Bearer ${auth.token}`
    Authorization: `Bearer ${token}`
  }

});

export default axiosBackend;