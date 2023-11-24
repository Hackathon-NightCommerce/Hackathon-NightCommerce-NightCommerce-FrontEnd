import axios from "axios"

export const api = axios.create({
  // baseURL: "https://webcustons.onrender.com",
  baseURL: "http://localhost:3000",
  timeout: 70000,
})

export const apiKenzie = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 7000,
})
