import React from "react";
import {
  LayoutDashboard,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { dashboardCards } from "../../data/dashboardCards";
import { DashboardSideChart } from "../components/dashboard/DashboardSideChart";
import { DashboardAlertsPanel } from "../components/dashboard/DashboardAlertsPanel";

export const Dashboard = () => {
  const { collapsed } = useSidebar();

  return (
    <div className={`pt-5 px-6 pb-10 ${collapsed ? "pl-20" : "pl-64"}`}>
      <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-black dark:text-white transition-none">
        <LayoutDashboard className="h-6 w-6 text-[#FA565F]" /> Dashboard
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Bem-vindo ao MoniFlow — uma plataforma inteligente para monitoramento de infraestrutura de TI, com foco em detecção de anomalias, previsão de falhas e automação de soluções.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {dashboardCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm max-w-[600px] min-w-[250px]"
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-medium ${card.titleColor}`}>
                  {card.title}
                </h3>
                {card.icon}
              </div>
              <div className="text-xl font-semibold mt-2 text-black dark:text-white transition-none">
                {card.value}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {card.status}
              </p>
              {card.percentage !== undefined && (
                <>
                  <div className="mt-2 w-full bg-neutral-300 dark:bg-neutral-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#FA565F] to-[#9352F4]"
                      style={{ width: `${card.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-right text-neutral-600 dark:text-neutral-300 mt-1">
                    {card.percentage}%
                  </div>
                </>
              )}
              {card.tags && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {card.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${tag.color}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Gráfico lateral */}
        <DashboardSideChart />
      </div>

      {/* Janela de detalhes de alertas */}
      <DashboardAlertsPanel />
    </div>
  );
};
