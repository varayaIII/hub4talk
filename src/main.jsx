import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Room from "./pages/Room.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🎨 Estilos
import "./styles/index.css";
import "./styles/background.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
