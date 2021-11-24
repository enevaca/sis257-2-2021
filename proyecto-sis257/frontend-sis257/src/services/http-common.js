import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im52YWNhIiwiY2hlY2siOnRydWUsImlhdCI6MTYzNzcyNTM2NCwiZXhwIjoxNjM3NzI3MTY0fQ.79YwLmrF8E77a7hweH1G2eoJO0Yo3jPSeR2jUJEpZSI",
  },
});
