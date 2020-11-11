import axios from "axios";
import { API } from "../../backend";

export const getAllPosts = () => {
  return axios
    .get(`${API}/post/all`)
    .catch((err) => console.log(err));
};
