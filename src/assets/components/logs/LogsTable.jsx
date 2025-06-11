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

      <table className="w-full text-sm">
        <thead className="text-left text-black dark:text-white border-b dark:border-neutral-700">
          <tr>
            <th className="py-2 px-2">ID</th>
            <th className="py-2 px-2">Nome</th>
            <th className="py-2 px-2">Tipo</th>
            <th className="py-2 px-2">Descrição</th>
            <th className="py-2 px-2">Origem</th>
            <th className="py-2 px-2">Destino</th>
            <th className="py-2 px-2">Dropado</th>
            <th className="py-2 px-2">Data</th>
            <th className="py-2 px-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {logsFiltrados.map((log) => (
            <tr
              key={log.id}
              className={`text-black dark:text-white border-b dark:border-neutral-700 ${
                marcados.includes(log.id) ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
              }`}
            >
              <td className="py-2 px-2">{log.id}</td>
              <td className="py-2 px-2">{log.nome}</td>
              <td className="py-2 px-2">
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${tipoCores[log.tipo]}`}>
                  {log.tipo}
                </span>
              </td>
              <td className="py-2 px-2">{log.descricao}</td>
              <td className="py-2 px-2">{log.origem || "-"}</td>
              <td className="py-2 px-2">{log.destino || "-"}</td>
              <td className="py-2 px-2">{log.dropado ? "Sim" : "Não"}</td>
              <td className="py-2 px-2">{log.data}</td>
              <td className="py-2 px-2 flex gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
