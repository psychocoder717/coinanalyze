import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CryptoContext from "./components/CryptoContext";
ReactDOM.render(
  <React.StrictMode>
    {/* here i directly provide context to our index.js its can provide in app.js but i use here.  */}
      <CryptoContext>
      <App />
      </CryptoContext>
  </React.StrictMode>,
  document.getElementById("root")
)