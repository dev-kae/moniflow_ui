import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Sidebar } from "./assets/components/Sidebar";
import { TopMenu } from "./assets/components/TopMenu";

// Páginas
import { Dashboard } from "./assets/pages/Dashboard";
import { Servidores } from "./assets/pages/Servidores";
import { DBs } from "./assets/pages/DBs";
import { Endpoints } from "./assets/pages/Endpoints";
import { Alertas } from "./assets/pages/Alertas";
import { Logs } from "./assets/pages/Logs";
import Login from "./assets/pages/Login";
import Perfil from "./assets/pages/Perfil";

// Contexto
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("authToken");
  });

  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, [location]);

  return (
    <SidebarProvider>
      <div className={`flex ${darkMode ? "dark" : ""}`}>
        {isAuthenticated && !isLoginPage && <Sidebar />}

        <div className="flex-1 min-h-screen bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-colors duration-200">
          {isAuthenticated && !isLoginPage && (
            <TopMenu darkMode={darkMode} setDarkMode={setDarkMode} />
          )}

          <div className="p-6 mt-10 h-[calc(100vh)] overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
              />
              <Route
                path="/login"
                element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
              />
              {isAuthenticated ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/servidores" element={<Servidores />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/banco" element={<DBs />} />
                  <Route path="/endpoints" element={<Endpoints />} />
                  <Route path="/alertas" element={<Alertas />} />
                  <Route path="/logs" element={<Logs />} />
                  {/* outras rotas */}
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
