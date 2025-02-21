import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./config.jsx";
import "../src/main.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
