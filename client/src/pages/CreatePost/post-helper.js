import axios from "axios"
import {API} from "../../backend"
import { isAuthenticated } from "../Auth/auth-helper"

export const headerConfig = {
    headers: {
        "auth-token": isAuthenticated() && isAuthenticated().token
    }
}

export const createPost = ({title, message, subreddit}) => {
    return axios.post(`${API}/post/create`, {title, message, subreddit}, headerConfig)
            .catch(err => console.log(err))
}

export const getAllSubreddits = () => {
    return axios.get(`${API}/subreddit/all`)
            .catch(err => console.log(err))
}