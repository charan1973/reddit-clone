import React, { createContext, useReducer } from "react";
import messageReducer from "./messageReducer";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(messageReducer, {});

  return (
    <MessageContext.Provider value={{ message, messageDispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
