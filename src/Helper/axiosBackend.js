import axios from "axios";
import auth from "./auth"

console.log(sessionStorage.getItem('token'), "L4");
const axiosBackend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  headers: {
    // Authorization: auth.token == null ? null : `Bearer ${auth.token}`
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  }

});

export default axiosBackend;