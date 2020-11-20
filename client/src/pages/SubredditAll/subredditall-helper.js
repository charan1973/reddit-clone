import axios from "axios"
import {API} from "../../backend"
import { headerConfig } from "../../headerConfig"


export const getAllSubreddit = () => {
    return axios.get(`${API}/subreddit/all`)
            .catch(err => console.log(err)) 
}

export const createSubreddit = ({name, about}) => {
    return axios.post(`${API}/subreddit/create`, {name, about}, headerConfig)
        .catch(err => console.log(err))
}