import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { FileText, Flag } from "lucide-react";
import { LogsTable } from "../components/logs/LogsTable";
import { LogDetailModal } from "../components/logs/LogDetailModal";
import { tipoCores, dropadoCores } from "../components/logs/tagStyles";

export const Logs = () => {
  const { collapsed } = useSidebar();

  const [itensPorPagina, setItensPorPagina] = useState(10);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [marcados, setMarcados] = useState([]);
  const [filtroMarcadosAtivo, setFiltroMarcadosAtivo] = useState(false);
  const [logSelecionado, setLogSelecionado] = useState(null);

  const tipos = Object.keys(tipoCores);

  const logs = Array.from({ length: 143 }, (_, i) => {
    const tipo = tipos[i % tipos.length];
    const dropado = tipo === "REQUEST" || tipo === "ACCESS" ? i % 4 === 0 : false;

    return {
      id: i + 1,
      nome: `Log ${i + 1}`,
      tipo,
      descricao: `Evento do tipo ${tipo.toLowerCase()} detectado.`,
      data: `2025-06-10 12:${(i % 60).toString().padStart(2, "0")}`,
      origem: tipo === "ACCESS" || tipo === "REQUEST" ? `192.168.${i % 255}.${i % 200}` : "-",
      destino: tipo === "ACCESS" || tipo === "REQUEST" ? `10.0.0.${(i * 2) % 255}` : "-",
      dropado
    };
  });

  const filtrados = logs.filter((log) => {
    const correspondeBusca = [log.nome, log.tipo, log.descricao]
      .join(" ")
      .toLowerCase()
      .includes(busca.toLowerCase());
    const correspondeMarcado = !filtroMarcadosAtivo || marcados.includes(log.id);
    return correspondeBusca && correspondeMarcado;
  });

  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const exibidos = filtrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const alternarMarcacao = (id) => {
    setMarcados((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  return (
    <div
      className={`pt-5 pb-10 min-h-screen overflow-y-auto ${collapsed ? "pl-20 pr-6" : "pl-64 pr-6"}`}
    >
      <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2 text-black dark:text-white">
        <FileText className="h-6 w-6 text-[#FA565F]" /> Logs do Sistema
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Registro completo de atividades e eventos no sistema.
      </p>

      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por nome, tipo, etc."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm bg-popover text-popover-foreground dark:text-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-ring w-full md:w-1/2"
        />

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setFiltroMarcadosAtivo((prev) => !prev)}
            title="Exibir apenas logs marcados"
            className="cursor-pointer"
          >
            <Flag
              className={`w-5 h-5 transition-colors ${
                filtroMarcadosAtivo ? "fill-[#FA565F] text-[#FA565F]" : "text-neutral-500"
              }`}
            />
          </button>

          <select
            value={itensPorPagina}
            onChange={(e) => {
              setItensPorPagina(Number(e.target.value));
              setPaginaAtual(1);
            }}
            className="px-3 py-2 border border-border rounded-md text-sm bg-popover text-popover-foreground dark:text-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>{n} por página</option>
            ))}
          </select>
        </div>
      </div>

      <LogsTable
        logs={exibidos}
        onDetalhar={setLogSelecionado}
        onMarcar={alternarMarcacao}
        marcados={marcados}
        tipoCores={tipoCores}
        dropadoCores={dropadoCores}
      />

      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPaginaAtual(n)}
            className={`px-3 py-1 rounded-md text-sm font-medium border border-border hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer ${
              n === paginaAtual
                ? "bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white"
                : "bg-white dark:bg-neutral-800 text-black dark:text-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <LogDetailModal log={logSelecionado} onClose={() => setLogSelecionado(null)} />
    </div>
  );
};
