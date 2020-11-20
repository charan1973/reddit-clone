import MessageContextProvider from "./message/MessageContext";
import UserContextProvider from "./user/UserContext";

const RootContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <MessageContextProvider>{children}</MessageContextProvider>
    </UserContextProvider>
  );
};

export default RootContextProvider;
