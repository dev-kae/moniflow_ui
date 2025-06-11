import React from "react";
import {
  ShieldAlert,
  CloudAlert,
  DatabaseBackup,
  Network,
  AlertCircle,
} from "lucide-react";

class DashboardAlert {
  id: string;
  titulo: string;
  severidade: string;
  descricao: string;
  cor: string;
  icon: React.ReactNode;
  severityIcon: React.ReactNode;
  tags: { label: string; color: string }[];

  constructor(
    id: string,
    titulo: string,
    severidade: string,
    descricao: string,
    cor: string,
    icon: React.ReactNode,
    severityIcon: React.ReactNode,
    tags: { label: string; color: string }[]
  ) {
    this.id = id;
    this.titulo = titulo;
    this.severidade = severidade;
    this.descricao = descricao;
    this.cor = cor;
    this.icon = icon;
    this.severityIcon = severityIcon;
    this.tags = tags;
  }
}

export const dashboardAlerts: DashboardAlert[] = [
  new DashboardAlert(
    "alerta-001",
    "Fluxo anômalo de acessos detectado",
    "Crítico",
    "Um volume elevado e inesperado de requisições foi registrado no servidor às 14h35. Possível ataque DDoS em investigação.",
    "bg-red-600 text-white font-bold",
    <ShieldAlert className="h-4 w-4 text-red-600" />,
    <AlertCircle className="h-3.5 w-3.5 mr-1 text-white" />,
    [
      { label: "Segurança", color: "bg-blue-600 text-white font-bold" },
      { label: "Alta prioridade", color: "bg-red-100 text-red-800" },
      { label: "Pico de tráfego", color: "bg-yellow-100 text-yellow-800" },
    ]
  ),
  new DashboardAlert(
    "alerta-002",
    "Servidor de aplicação fora do ar",
    "Crítico",
    "Servidor X permanece inacessível após sobrecarga de tráfego.",
    "bg-red-600 text-white font-bold",
    <CloudAlert className="h-4 w-4 text-red-600" />,
    <AlertCircle className="h-3.5 w-3.5 mr-1 text-white" />,
    [
      { label: "Infraestrutura", color: "bg-purple-600 text-white font-bold" },
      { label: "Indisponível", color: "bg-red-100 text-red-800" },
    ]
  ),
  new DashboardAlert(
    "alerta-003",
    "Banco de dados fora do ar",
    "Médio",
    "Instância do banco Y está indisponível desde a sobrecarga.",
    "bg-yellow-600 text-white font-bold",
    <DatabaseBackup className="h-4 w-4 text-yellow-600" />,
    <AlertCircle className="h-3.5 w-3.5 mr-1 text-white" />,
    [
      { label: "Banco de Dados", color: "bg-green-600 text-white font-bold" },
      { label: "Desempenho", color: "bg-yellow-100 text-yellow-800" },
    ]
  ),
  new DashboardAlert(
    "alerta-004",
    "API com alta latência",
    "Médio",
    "API Z está com tempo de resposta acima do normal há mais de 2 horas.",
    "bg-yellow-600 text-white font-bold",
    <Network className="h-4 w-4 text-yellow-600" />,
    <AlertCircle className="h-3.5 w-3.5 mr-1 text-white" />,
    [
      { label: "API", color: "bg-indigo-600 text-white font-bold" },
      { label: "Latência", color: "bg-yellow-100 text-yellow-800" },
    ]
  ),
];
