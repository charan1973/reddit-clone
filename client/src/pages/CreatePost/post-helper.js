import axios from "axios"
import {API} from "../../backend"
import { headerConfig } from "../../headerConfig"

export const createPost = ({title, message, subreddit, token}) => {
    return axios.post(`${API}/post/create`, {title, message, subreddit}, headerConfig)
            .catch(err => console.log(err))
}

export const getAllSubreddits = () => {
    return axios.get(`${API}/subreddit/all`)
            .catch(err => console.log(err))
}

