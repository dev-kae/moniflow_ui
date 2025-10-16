import React, { useState } from "react";
import { Eye, Flag } from "lucide-react";
import { tipoCores, dropadoCores } from "./tagStyles";

export const LogsTable = ({ logs, onDetalhar, onMarcar, marcados }) => {
  const tiposDisponiveis = [...new Set(logs.map((log) => log.tipo))];
  const [tiposSelecionados, setTiposSelecionados] = useState([]);
  const [dropadoSelecionado, setDropadoSelecionado] = useState({ sim: false, nao: false });

  const logsFiltrados = logs.filter((log) => {
    const tipoOk =
      tiposSelecionados.length === 0 || tiposSelecionados.includes(log.tipo);
    const dropadoOk =
      (!dropadoSelecionado.sim && !dropadoSelecionado.nao) ||
      (dropadoSelecionado.sim && log.dropado) ||
      (dropadoSelecionado.nao && !log.dropado);
    return tipoOk && dropadoOk;
  });

  const toggleTipo = (tipo) => {
    setTiposSelecionados((prev) =>
      prev.includes(tipo)
        ? prev.filter((t) => t !== tipo)
        : [...prev, tipo]
    );
  };

  const toggleDropado = (valor) => {
    setDropadoSelecionado((prev) => ({ ...prev, [valor]: !prev[valor] }));
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black dark:text-white">Tipo:</span>
          <div className="flex flex-wrap gap-2">
            {tiposDisponiveis.map((tipo) => {
              const ativo = tiposSelecionados.includes(tipo);
              return (
                <span
                  key={tipo}
                  onClick={() => toggleTipo(tipo)}
                  className={`cursor-pointer text-xs px-3 py-1 rounded-full select-none border border-transparent font-medium transition-colors duration-200 ${
                    ativo ? tipoCores[tipo] : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  {tipo}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-black dark:text-white">Dropado:</span>
          <div className="flex flex-wrap gap-2">
            {['sim', 'nao'].map((opcao) => {
              const ativo = dropadoSelecionado[opcao];
              const cor = dropadoCores[opcao];
              return (
                <span
                  key={opcao}
                  onClick={() => toggleDropado(opcao)}
                  className={`cursor-pointer text-xs px-3 py-1 rounded-full select-none border border-transparent font-medium transition-colors duration-200 ${
                    ativo ? cor : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
                </span>
              );
            })}
          </div>
        </div>
      </div>

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
          {logsFiltrados.map((log) => (
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
