import axios from "axios";
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
export const request = axios.create({
  baseURL: `http://localhost:3000/`,
  timeout: 10000,
});

const errorHandler = (error) => {
  if (error && error.response) {
    console.log(error);
  }

  return Promise.reject(error.response);
};

request.interceptors.response.use((response) => response.data, errorHandler);
