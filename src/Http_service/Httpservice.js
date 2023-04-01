import axios from "axios";

export const base_url = "https://bookingapi-8rjt.onrender.com";

const token = JSON.parse(localStorage.getItem("Admin"))?.token;

export const apiimage = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
