import axios from "axios"
import {API} from "../../backend"
import { headerConfig } from "../../headerConfig"

export const getSubredditInfo = (subredditName) => {
    return axios.get(`${API}/r/${subredditName}`)
            .catch(err => console.log(err))
}

export const joinSubreddit = (subredditId) => {
    return axios.put(`${API}/subreddit/join`, {subredditId}, headerConfig)
            .catch(err => console.log(err))
}