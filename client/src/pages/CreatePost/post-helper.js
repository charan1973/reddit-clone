import axios from "axios";
import { API } from "../../backend";
import { headerConfig } from "../../headerConfig";

export const createPost = (data) => {
  return axios
    .post(
      `${API}/post/create`,
      data,
      {
          headers:{
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              "auth-token": JSON.parse(localStorage.getItem("user")).token
          }
      }
    )
    .catch((err) => console.log(err));
};

export const getAllSubreddits = () => {
  return axios.get(`${API}/subreddit/all`).catch((err) => console.log(err));
};
