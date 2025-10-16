import React from "react";
import { Eye, Flag } from "lucide-react";
import { tipoCores } from "./tagStyles";

export const LogsTable = ({ logs, onDetalhar, onMarcar, marcados }) => {

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-sm border-collapse">
        <thead className="text-left text-black dark:text-white">
          <tr className="border-b border-r-0 border-l-0 border-t-0 border-neutral-200 dark:border-neutral-700">
            <th className="py-2 px-2 w-32 border-r border-neutral-200 dark:border-neutral-700">Tipo</th>
            <th className="py-2 px-2 w-48 border-r border-neutral-200 dark:border-neutral-700">Timestamp</th>
            <th className="py-2 px-2 border-r border-neutral-200 dark:border-neutral-700">Descrição</th>
            <th className="py-2 px-2 w-48 border-r border-neutral-200 dark:border-neutral-700">Sistema de Origem</th>
            <th className="py-2 px-2 w-24 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              className={`text-black dark:text-white border-b border-neutral-200 dark:border-neutral-700 ${
                marcados.includes(log.id) ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
              }`}
            >
              <td className="py-2 px-2 w-32 border-r border-neutral-200 dark:border-neutral-700">
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${tipoCores[log.tipo]} whitespace-nowrap inline-block`}>
                  {log.tipo}
                </span>
              </td>
              <td className="py-2 px-2 w-48 whitespace-nowrap text-sm border-r border-neutral-200 dark:border-neutral-700">
                {new Date(log.timestamp).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}
                <span className="text-xs opacity-70">
                  .{new Date(log.timestamp).getMilliseconds().toString().padStart(3, '0')}
                </span>
              </td>
              <td className="py-2 px-2 text-sm border-r border-neutral-200 dark:border-neutral-700">{log.descricao}</td>
              <td className="py-2 px-2 w-48 text-sm border-r border-neutral-200 dark:border-neutral-700">{log.sistemaOrigem}</td>
              <td className="py-2 px-2 w-24">
                <div className="flex justify-center gap-2">
                <button
                  title="Ver detalhes"
                  onClick={() => onDetalhar(log)}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  title="Marcar para inspeção"
                  onClick={() => onMarcar(log.id)}
                  className={`hover:underline cursor-pointer ${
                    marcados.includes(log.id)
                      ? "text-[#FA565F] fill-[#FA565F]"
                      : "text-neutral-500"
                  }`}
                >
                  <Flag
                    className={`w-4 h-4 ${
                      marcados.includes(log.id) ? "fill-[#FA565F]" : ""
                    }`}
                  />
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
