import axios from "axios";
import auth from "./auth"

console.log(sessionStorage.getItem('token'), "L4");
const axiosBackend2 = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    // Authorization: auth.token == null ? null : `Bearer ${auth.token}`
    Authorization: `Bearer ${sessionStorage.getItem('token')}`
  }

});

export default axiosBackend2;