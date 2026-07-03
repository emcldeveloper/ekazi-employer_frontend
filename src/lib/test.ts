import axios from "axios";

const test = axios.create({
  baseURL: import.meta.env.VITE_API_TEST_URL,
  withCredentials: false,
});

export default test;
