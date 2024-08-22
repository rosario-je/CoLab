import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/AppContext";
import axios from "axios";

axios.defaults.baseURL = "https://colab-server-gs6a.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);