import axios from "axios";
import { API } from "../../backend";

export const signUpAuth = ({ username, password }) => {
  return axios
    .post(`${API}/register`, { username, password })
    .catch((err) => console.log(err));
};

export const signInAuth = ({ username, password }) => {
  return axios
    .post(`${API}/login`, { username, password })
    .catch((err) => console.log(err));
};
