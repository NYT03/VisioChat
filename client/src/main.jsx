import React from "react";
import ReactDOM from "react-dom/client";
// import CurrentUserContext from "../context/UserContext.jsx";
import App from "./App2.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CurrentUserContext.Provider> */}
      <App />
    {/* </CurrentUserContext.Provider> */}
  </React.StrictMode>
);
