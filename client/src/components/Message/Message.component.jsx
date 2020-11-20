import { useContext, useEffect } from "react";
import { MessageContext } from "../../context/message/MessageContext";
import { HIDE_MESSAGE } from "../../context/message/messageTypes";

const Message = () => {
  const { message, messageDispatch } = useContext(MessageContext);

  useEffect(() => {
    setTimeout(() => {
      messageDispatch({
        type: HIDE_MESSAGE,
      });
    }, 1000);
  }, [message]);

  return (
    <>
      {message.message && (
        <div id="message">
          <div className={message.type}>
            <i
              className={`fas ${
                message.type === "error"
                  ? "fa-exclamation-triangle"
                  : "fa-info-circle"
              }`}
            ></i>
            <p>{message.message}</p> 
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
