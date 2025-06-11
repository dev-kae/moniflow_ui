import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { ShieldAlert, Activity, Flame, AlertTriangle } from "lucide-react";
import { AlertaCard } from "../components/alerts/AlertaCard";
import { GraficoFluxo } from "../components/alerts/GraficoFluxo";
import { TabelaIPs } from "../components/alerts/TabelaIPS";

export const Alertas = () => {
  const { collapsed } = useSidebar();
  const [fluxo] = useState([
    { time: "12:00", requests: 120 },
    { time: "12:05", requests: 90 },
    { time: "12:10", requests: 160 },
    { time: "12:15", requests: 220 },
    { time: "12:20", requests: 130 },
    { time: "12:25", requests: 190 },
  ]);

  const ipsSuspeitos = [
    { ip: "192.168.1.10", pais: "Brasil", requests: 934 },
    { ip: "177.220.11.42", pais: "Brasil", requests: 812 },
    { ip: "91.133.204.33", pais: "Rússia", requests: 523 },
    { ip: "185.231.112.99", pais: "Irã", requests: 420 },
  ];

  const alertas = [
    {
      titulo: "Tentativa de acesso não autorizado",
      descricao: "Detectamos tentativa de login com credenciais inválidas.",
      icone: <ShieldAlert className="text-purple-600 w-5 h-5" />,
    },
    {
      titulo: "Tráfego suspeito detectado",
      descricao: "Fluxo anormal de dados na porta 443.",
      icone: <Activity className="text-purple-600 w-5 h-5" />,
    },
    {
      titulo: "Sobreposição de firewall",
      descricao: "Regra de bloqueio conflitante com whitelist.",
      icone: <Flame className="text-purple-600 w-5 h-5" />,
    },
    {
      titulo: "API exposta publicamente",
      descricao: "Endpoint sem autenticação detectado na web.",
      icone: <AlertTriangle className="text-purple-600 w-5 h-5" />,
    },
  ];

  return (
    <div
      className={`pt-5 pb-40 mb-10 transition-all duration-300 min-h-[140vh] overflow-y-auto ${collapsed ? "pl-20 pr-6" : "pl-64 pr-6"}`}
    >
      <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2 text-black dark:text-white">
        <ShieldAlert className="h-6 w-6 text-purple-600" /> Alertas de Segurança
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Monitoramento de ameaças e vulnerabilidades em tempo real.
      </p>

      {/* Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mb-8">
        {alertas.map((a, idx) => (
          <AlertaCard key={idx} icone={a.icone} titulo={a.titulo} descricao={a.descricao} />
        ))}
      </div>

      {/* Gráfico */}
      <GraficoFluxo dados={fluxo} />

      {/* Tabela de IPs */}
      <TabelaIPs dados={ipsSuspeitos} />
    </div>
  );
};
