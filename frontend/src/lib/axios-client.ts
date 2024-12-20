import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
