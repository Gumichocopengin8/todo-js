import axiosBase from "axios";

const urlBase = 'http://localhost:8080';
const headers = {
  "Content-Type": "application/json",
};

export const axios = axiosBase.create({
  baseURL: urlBase,
  headers,
  responseType: "json",
});

export const todolistsURL = "/todolists";
