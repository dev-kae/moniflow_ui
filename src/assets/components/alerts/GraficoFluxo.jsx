import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BarChart2 } from "lucide-react";

export const GraficoFluxo = ({ dados }) => (
  <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow mb-8">
    <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-black dark:text-white">
      <BarChart2 className="w-5 h-5 text-purple-600" /> Fluxo de Requisições Suspeitas
    </h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={dados} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line type="monotone" dataKey="requests" stroke="#9810FA" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
