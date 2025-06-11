import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronRight as SubChevronRight,
  User,
  LogOut,
  X
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

const menuItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", route: "/dashboard" },
  {
    icon: <Server size={18} />,
    label: "Infraestrutura",
    subItems: [
      { label: "Servidores", route: "/servidores" },
      { label: "Banco de Dados", route: "/banco" },
      { label: "Endpoints", route: "/endpoints" }
    ]
  },
  { icon: <AlertTriangle size={18} />, label: "Alertas", route: "/alertas" },
  { icon: <MessageSquare size={18} />, label: "Logs", route: "/logs" }
];

const SidebarItem = ({ icon, label, subItems, collapsed, route }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (subItems) {
      setOpen(!open);
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <div className="select-none">
      <div
        className={`group flex items-center ${collapsed ? "justify-center" : "justify-between"} p-2 rounded transition-all cursor-pointer text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:pl-3`}
        onClick={handleClick}
      >
        <div className={`flex items-center gap-3 w-full ${collapsed ? "justify-center" : ""}`}>
          <span className="transition-colors group-hover:text-[#FA565F]">
            {icon}
          </span>

          {!collapsed && (
            <span className="font-medium transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FA565F] group-hover:to-[#9352F4]">
              {label}
            </span>
          )}
        </div>
        {!collapsed && subItems && (
          <span>
            {open ? <ChevronDown size={16} /> : <SubChevronRight size={16} />}
          </span>
        )}
      </div>

      {!collapsed && open && subItems && (
        <div className="ml-8 space-y-1">
          {subItems.map((sub, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-2 text-base text-neutral-600 dark:text-neutral-300 cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FA565F] hover:to-[#9352F4] select-none"
              onClick={() => navigate(sub.route)}
            >
              <span className="w-1 h-1 bg-neutral-800 dark:bg-neutral-200 rounded-full" />
              <span>{sub.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/" || location.pathname === "/login";
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  if (!isLoggedIn || isLoginPage) return null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [collapsed]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen bg-neutral-100 dark:bg-neutral-900 border-r-2 border-neutral-300 dark:border-neutral-500 text-black dark:text-white transition-all duration-150 p-4 flex flex-col justify-between z-40 ${collapsed ? "w-16" : "w-64"}`}
      >
        {/* Header */}
        <div>
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} mb-6`}>
            {!collapsed && (
              <img
                src="/moniflow.svg"
                alt="logo"
                className="ml-2 h-15 select-none pointer-events-none"
                draggable={false}
              />
            )}
            <button
              className="text-black dark:text-white p-1 rounded hover:bg-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                subItems={item.subItems}
                collapsed={collapsed}
                route={item.route}
              />
            ))}
          </nav>
        </div>

        {/* Profile & Logout */}
        <div className="relative select-none" ref={dropdownRef}>
          <div
            className={`mt-6 p-2 rounded-lg transition-all duration-200 cursor-pointer ${collapsed ? "flex flex-col items-center" : "flex items-center gap-3 hover:bg-neutral-300 dark:hover:bg-neutral-800"}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-10 h-10">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            {!collapsed && (
              <div>
                <div className="text-sm font-semibold">Gabriel Borba</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">gabriel@moniflow.com</div>
              </div>
            )}
          </div>

          {dropdownOpen && (
            <div className={`absolute bottom-16 left-0 w-48 bg-white dark:bg-neutral-800 text-sm rounded shadow-lg py-2 z-50`}>
              {collapsed && (
                <div className="px-4 py-2 text-neutral-600 dark:text-neutral-400 text-xs">gabriel@moniflow.com</div>
              )}
              <div
                onClick={() => navigate("/perfil")}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer"
              >
                <User size={16} /> <span>Perfil</span>
              </div>

              <div
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer"
              >
                <LogOut size={16} /> <span>Sair</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="relative w-full max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 text-center animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              onClick={() => setShowLogoutConfirm(false)}
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Deseja realmente sair?</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Você será desconectado da plataforma MoniFlow.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-28 px-4 py-2 rounded bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="w-28 px-4 py-2 rounded bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white hover:opacity-90 transition-opacity cursor-pointer"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
