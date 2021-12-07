import axios from "axios";

var token = localStorage.getItem("token");

export default axios.create({
  baseURL: "https://backend-sis257.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  },
});
