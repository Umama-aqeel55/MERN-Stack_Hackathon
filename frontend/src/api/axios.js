import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // 🛑 yahan apna backend URL likhna
  withCredentials: true, // cookies bhi bhejega agar zarurat hui
});

export default instance;
