import {
  Server,
  Database,
  Globe,
  AlertTriangle,
} from "lucide-react";

export const dashboardCards = [
  {
    title: "Servidores",
    labelIcon: <Server className="h-4 w-4 text-orange-600" />,
    icon: <Server className="h-5 w-5 text-orange-600 bg-clip-text" />,
    value: "12/14",
    status: "Servidores online",
    percentage: 86,
    titleColor: "text-black dark:text-white transition-none",
  },
  {
    title: "Banco de Dados",
    labelIcon: <Database className="h-4 w-4 text-green-600" />,
    icon: <Database className="h-5 w-5 text-green-600 bg-clip-text" />,
    value: "4/5",
    status: "Instâncias ativas",
    percentage: 80,
    titleColor: "text-black dark:text-white transition-none",
  },
  {
    title: "Endpoints",
    labelIcon: <Globe className="h-4 w-4 text-blue-600" />,
    icon: <Globe className="h-5 w-5 text-blue-600 bg-clip-text" />,
    value: "24/30",
    status: "APIs operacionais",
    percentage: 80,
    titleColor: "text-black dark:text-white transition-none",
  },
  {
    title: "Alertas",
    labelIcon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600 bg-clip-text" />,
    value: 4,
    status: "Alertas ativos",
    tags: [
      { label: "Crítico: 2", color: "bg-red-100 text-red-800" },
      { label: "Médio: 2", color: "bg-yellow-100 text-yellow-800" },
    ],
    titleColor: "text-black dark:text-white transition-none",
  },
];
