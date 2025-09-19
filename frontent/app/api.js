const { default: axios } = require("axios");

const API = axios.create({
  //baseURL: "http://localhost:4000/api",
  baseURL: " https://flipkart-clone-mgrg.onrender.com/api",
  withCredentials: true,
});

export default API;
