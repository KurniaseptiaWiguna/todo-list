import axios from "axios";

// Create base URL API
export const API = axios.create({
  // baseURL: "https://6197c01b164fa60017c22de0.mockapi.io/api/v1/",
  baseURL: "http://192.168.18.7:5000/api/v1/",
});