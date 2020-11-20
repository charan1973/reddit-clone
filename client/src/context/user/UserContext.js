import React, { createContext, useEffect, useReducer } from 'react';
import userReducer from './userReducer';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, userDispatch] = useReducer(userReducer, {}, () => {
        const localData = localStorage.getItem("user")
        return JSON.parse(localData)
    })

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return ( 
        <UserContext.Provider value={{user, userDispatch}}>
            {children}
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;