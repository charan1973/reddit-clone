const backend = process.env.REACT_APP_BACKEND
export const API = `${backend ? backend : ""}/api`

// const userToken = JSON.parse(localStorage.getItem("user")).token

// export const headerConfig = {
//     headers: {
//         "auth-token": userToken,
//         "Content-Type": "application/json"
//     }
// }