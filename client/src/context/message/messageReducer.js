import { HIDE_MESSAGE, SHOW_ERROR, SHOW_INFO } from "./messageTypes";

const messageReducer = (state, action) => {
  switch (action.type) {
    case SHOW_INFO:
      return {
          message: action.message,
          type: "info"
      };
    case SHOW_ERROR:
        return {
            message: action.message,
            type: "error"
        }

    case HIDE_MESSAGE:
      return "";

    default:
      return state;
  }
};

export default messageReducer;
