import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <ThemeProvider>

    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
    </ThemeProvider>

  </React.StrictMode>

);
