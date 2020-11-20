const userToken = JSON.parse(localStorage.getItem("user")).token

export const headerConfig = {
    headers: {
        "auth-token": userToken,
        "Content-Type": "application/json"
    }
}