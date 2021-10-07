import axios from "axios";
import auth from "./auth"

const token = sessionStorage.getItem('token')
console.log("token apibackend", token);
const axiosBackend2 = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    // Authorization: auth.token == null ? null : `Bearer ${auth.token}`
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  }

});

export default axiosBackend2;