import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@moniflow.com" && password === "1234") {
      localStorage.setItem("authToken", "fake-token");
      onLoginSuccess();
      navigate("/dashboard");
    } else {
      setError("Credenciais inválidas.");
    }
  };

  const linkColor = darkMode ? "text-white" : "text-black";

  return (
    <div className={`${darkMode ? "dark" : ""} h-screen w-screen overflow-hidden`}>
      {/* Imagem de fundo */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("/spino.jpg")`,
        }}
      ></div>

      {/* Blur overlay */}
      <div className="fixed inset-0 backdrop-blur-sm bg-white/50 dark:bg-black/50 z-0"></div>

      {/* Conteúdo do login */}
      <div className="relative z-10 flex items-center justify-center h-full w-full px-4">
        <div className="bg-white dark:bg-neutral-900 p-10 rounded-xl shadow-lg w-full max-w-md text-neutral-800 dark:text-white mt-[-40px]">
          <div className="flex justify-center mb-8 select-none">
            <img 
                src="/moniflow-logo-y.svg"
                alt="moniflow"
                className="h-30 select-none pointer-events-none"
                draggable={false}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <label className="block text-sm font-semibold mb-1 select-none">
            Email
          </label>
          <input
            type="email"
            className="w-full mb-4 px-3 py-2 rounded border bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700"
            placeholder="exemplo@moniflow.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-sm font-semibold mb-1 select-none">
            Senha
          </label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 rounded border bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 pr-10"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-neutral-600 dark:text-neutral-300 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className={`w-full text-white py-2 rounded font-semibold transition-colors cursor-pointer`}
            style={{
              backgroundImage: "linear-gradient(to right, #FA565F, #9352F4)",
            }}
          >
            Entrar
          </button>

          <div className="flex justify-between mt-4 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${linkColor} hover:opacity-80 transition-colors p-2 rounded cursor-pointer`}
              title="Alternar tema"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#"
              className={`${linkColor} hover:underline text-sm cursor-pointer`}
            >
              Esqueci minha senha
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
