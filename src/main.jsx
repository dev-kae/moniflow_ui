import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Corrigido o import
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";

const rootElement = document.getElementById("root"); // Pegando o elemento certo

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error("Elemento #root não encontrado no HTML.");
}
