import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY as string;

const proxyUrl = "http://localhost:8080/proxy?url=";
const fullUrl = `${proxyUrl}${BASE_URL}`;

console.log(BASE_URL, API_KEY);

export const sensiboApi = axios.create({
  baseURL: fullUrl,
  params: {
    apiKey: API_KEY,
  },
});
