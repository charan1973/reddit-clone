import axios from "axios"
import {API} from "../../backend"

export const signUpAuth = ({username, password}) => {
    return axios.post(`${API}/register`, {username, password})
        .catch(err => console.log(err))
}

export const signInAuth = ({username, password}) => {
   axios.post(`${API}/login`, {username, password})
   .then(response => {
       if(typeof window !== undefined){
           localStorage.setItem("user", JSON.stringify(response.data))
       }
   })
   .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(localStorage.getItem("user")){
        return JSON.parse(localStorage.getItem("user"))
    }else{
        return
    }
}
