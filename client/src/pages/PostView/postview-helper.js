import axios from "axios"
import { API } from "../../backend"
import { headerConfig } from "../../headerConfig"

export const getCurrentPost = (postId) => {
    return axios.get(`${API}/post/${postId}`)
            .catch(err => console.log(err))
}

export const editPost = (postId, newMessage) => {
    return axios.put(`${API}/post/edit`, {postId, newMessage}, headerConfig)
            .catch(err => console.log(err))
}

export const deletePost = (postId) => {
    console.log(headerConfig);
    return axios.delete(`${API}/post/delete`, {...headerConfig, data: {postId}})
            .catch(err => console.log(err))
}

export const addComment = (postId, comment) => {
    return axios.post(`${API}/comment/create/${postId}`, {comment}, headerConfig)
            .catch(err => console.log(err))
}

export const deleteComment = (postId, commentId) =>{
    return axios.delete(`${API}/comment/delete/${postId}`, {...headerConfig, data:{commentId}})
            .catch(err => console.log(err))
}