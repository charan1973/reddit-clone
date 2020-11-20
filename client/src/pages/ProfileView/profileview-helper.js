import axios from "axios"
import {API} from "../../backend"

export const getUserInfo = (username) => {
    return axios.get(`${API}/u/${username}`)
            .catch(err => console.log(err))
}