import axios from "axios";
import { API } from "../../backend";
import { headerConfig } from "../../headerConfig";

export const getAllPosts = () => {
  return axios
    .get(`${API}/post/all`)
    .catch((err) => console.log(err));
};

export const getPostsFromJoined = () => {
  return axios
          .get(`${API}/post/all/from-joined-subs`, headerConfig)
          .catch(err => console.log(err))
}