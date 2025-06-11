import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import { RequestDataSource } from "../../../data/mockData";
import { ChartLine } from "lucide-react";

export const DashboardSideChart = () => {
  const [view, setView] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [data, setData] = useState([]);

  const dataSource = new RequestDataSource();

  useEffect(() => {
    if (view === "hour" && selectedDate) {
      const filtered = dataSource.getHourlyDataByDate(selectedDate);
      setData(filtered);
    } else if (view === "day") {
      const d = dataSource.getDataByView("day", { monthIndex: selectedMonthIndex });
      setData(d);
    } else {
      const d = dataSource.getDataByView(view);
      setData(d);
    }
  }, [view, selectedDate, selectedMonthIndex]);

  const monthOptions = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const totalRequests = data.reduce((sum, entry) => sum + (entry.requests || 0), 0);

  return (
    <div className="flex-1 max-w-full min-h-[300px] bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
          <ChartLine className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <h2>Variação de Requests</h2>
        </div>
        <div className="flex items-center gap-2">
          {view === "hour" && (
            <input
              type="date"
              className="h-8 px-2 text-xs rounded-md border border-border bg-popover text-popover-foreground text-black dark:invert shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          )}

          {view === "day" && (
            <Select value={String(selectedMonthIndex)} onValueChange={(val) => setSelectedMonthIndex(Number(val))}>
              <SelectTrigger className="w-[100px] h-8 text-xs bg-popover text-popover-foreground border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <SelectValue>{monthOptions[selectedMonthIndex]}</SelectValue>
              </SelectTrigger>
              <SelectContent
                className="z-50 min-w-[100px] bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-border shadow-md rounded-md"
                sideOffset={8}
              >
                {monthOptions.map((label, index) => (
                  <SelectItem key={index} value={String(index)}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[100px] h-8 text-xs bg-popover text-popover-foreground border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent
              className="z-50 min-w-[100px] bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-border shadow-md rounded-md"
              sideOffset={8}
            >
              <SelectItem value="month">Mensal</SelectItem>
              <SelectItem value="day">Diária</SelectItem>
              <SelectItem value="hour">Horária</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-xs text-neutral-600 dark:text-neutral-300 mb-2">
        Total de requests no período: <strong>{totalRequests}</strong>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-neutral-900 p-2 border rounded shadow text-xs">
                    <p><strong>Horário:</strong> {label}</p>
                    <p><strong>Requests:</strong> {payload[0].value}</p>
                    {view === "hour" && selectedDate && (
                      <p><strong>Data:</strong> {selectedDate}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
