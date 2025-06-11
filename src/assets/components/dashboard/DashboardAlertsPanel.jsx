import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  MessageSquareWarning,
} from "lucide-react";

import { dashboardAlerts } from "../../../data/dashboardAlerts";

export const DashboardAlertsPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/alertas");
  };

  return (
    <div className="mt-8 bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-black dark:text-white">
          <MessageSquareWarning className="h-5 w-5 text-[#FA565F]" /> Detalhes dos Alertas
        </h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition cursor-pointer"
        >
          {collapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>
      </div>

      {!collapsed && (
        <div
          className="
            overflow-y-auto pr-1 max-h-[288px]
            scrollbar-thin
            scrollbar-thumb-alert-thumb
            scrollbar-track-transparent
            scrollbar-thumb-rounded-full
            dark:scrollbar-thumb-alert-thumb-dark
            scrollbar-hide-scroll-buttons
          "
        >
          {dashboardAlerts.length === 0 ? (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Nenhum alerta ativo no momento.
            </p>
          ) : (
            <ul className="space-y-4">
              {dashboardAlerts.map((alert) => (
                <li
                  key={alert.id}
                  onClick={handleClick}
                  className="p-4 dark:bg-neutral-700 bg-white border border-neutral-300 dark:border-none rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors w-full cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {alert.icon}
                      <h3 className="text-sm font-semibold text-black dark:text-white">
                        {alert.titulo}
                      </h3>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center ${alert.cor}`}
                    >
                      {alert.severityIcon} {alert.severidade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">
                      {alert.descricao}
                    </p>
                    {alert.tags && (
                      <div className="mt-1 flex flex-wrap gap-1 justify-end">
                        {alert.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${tag.color}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAlertsPanel;
