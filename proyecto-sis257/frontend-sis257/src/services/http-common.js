import axios from "axios";

var token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  },
});
