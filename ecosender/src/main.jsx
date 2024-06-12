import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="366606791613-8etsmtnib96i72eivpf6h62r5d0jp3kh.apps.googleusercontent.com">
    {/*<React.StrictMode>*/}
      <App />
    {/*</React.StrictMode>*/}
  </GoogleOAuthProvider>
);
