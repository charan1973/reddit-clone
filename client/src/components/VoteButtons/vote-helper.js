import {API} from "../../backend"
import axios from "axios"
import { headerConfig } from "../../pages/CreatePost/post-helper"


export const upvote = (postId) => {
    return axios.put(`${API}/post/upvote`, {postId}, headerConfig)
            .catch(err => console.log(err))
}

export const downvote = (postId) => {
    return axios.put(`${API}/post/downvote`, {postId}, headerConfig)
            .catch(err => console.log(err))
}