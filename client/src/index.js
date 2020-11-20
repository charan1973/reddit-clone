import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import RootContextProvider from "./context/RootContext";

ReactDOM.render(
  <RootContextProvider>
    <App />
  </RootContextProvider>,

  document.getElementById("root")
);
