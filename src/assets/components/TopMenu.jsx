import React, { useEffect, useRef, useState } from "react";
import { Bell, Sun, Moon, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const searchableItems = [
  { title: "Dashboard", route: "/dashboard" },
  { title: "Servidores", route: "/servidores" },
  { title: "Banco de Dados", route: "/banco" },
  { title: "Endpoints", route: "/endpoints" },
  { title: "Alertas", route: "/alertas" },
  { title: "Logs", route: "/logs" },
  { title: "Perfil", route: "/perfil" },
  { title: "Configurações", route: "/configuracoes" }, // adicione outras rotas conforme necessário
];

export const TopMenu = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      const results = searchableItems.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleResultClick = (route) => {
    navigate(route);
    setSearchQuery("");
    setSearchResults([]);
  };

  if (isLoginPage) return null;

  return (
    <div className="fixed top-0 right-0 z-30 h-14 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-500 dark:border-neutral-300 text-black dark:text-white flex items-center justify-end px-6 w-full">
      <div className="flex items-center gap-4 pr-2 relative" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-sm px-4 py-1 rounded-md w-64 focus:outline-none"
          />
          <Search className="absolute right-2 top-1.5 text-neutral-500 dark:text-neutral-400" size={16} />
        </div>

        {searchResults.length > 0 && (
          <div className="absolute top-10 right-0 w-64 bg-white dark:bg-neutral-800 rounded shadow z-50 border dark:border-neutral-700">
            {searchResults.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700"
                onClick={() => handleResultClick(item.route)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}

        <button className="hover:text-[#FA565F] cursor-pointer" onClick={toggleTheme}>
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative cursor-pointer hover:text-[#FA565F]"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full"></span>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 text-sm rounded shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-neutral-600 dark:border-neutral-300 font-semibold">Notificações</div>
              {notifications.length === 0 ? (
                <div className="px-4 py-2 text-neutral-600 dark:text-neutral-400">Nenhuma notificação</div>
              ) : (
                notifications.map((note, index) => (
                  <div key={index} className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer">
                    {note.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
