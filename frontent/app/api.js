const { default: axios } = require("axios");

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default API;
