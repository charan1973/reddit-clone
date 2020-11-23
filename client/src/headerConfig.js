
export const headerConfig = {
    headers: {
        "auth-token": JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).token : "",
        "Content-Type": "application/json"
    }
}