import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { FileText, Flag } from "lucide-react";
import { LogsTable } from "../components/logs/LogsTable";
import { LogDetailModal } from "../components/logs/LogDetailModal";
import { tipoCores, dropadoCores } from "../components/logs/tagStyles";

export const Logs = () => {
  const { collapsed } = useSidebar();

  const [busca, setBusca] = useState("");
  const [marcados, setMarcados] = useState([]);
  const [filtroMarcadosAtivo, setFiltroMarcadosAtivo] = useState(false);
  const [logSelecionado, setLogSelecionado] = useState(null);

  const tipos = Object.keys(tipoCores);

  const logs = Array.from({ length: 10 }, (_, i) => {
    const tipo = tipos[i % tipos.length];
    const dropado = tipo === "REQUEST" || tipo === "ACCESS" ? i % 4 === 0 : false;
    const timestamp = new Date();
    // Definindo uma data fixa (hoje) com horas, minutos, segundos e milissegundos variáveis
    timestamp.setHours(12, i % 60, i % 60, i * 100 % 1000);

    return {
      id: i + 1,
      tipo,
      descricao: `Evento do tipo ${tipo.toLowerCase()} detectado.`,
      timestamp: timestamp.toISOString(),
      sistemaOrigem: tipo === "ACCESS" || tipo === "REQUEST" ? `Sistema ${i % 3 + 1}` : "Sistema Principal",
      dropado
    };
  });

  const filtrados = logs.filter((log) => {
    const correspondeBusca = [log.tipo, log.descricao, log.sistemaOrigem]
      .join(" ")
      .toLowerCase()
      .includes(busca.toLowerCase());
    const correspondeMarcado = !filtroMarcadosAtivo || marcados.includes(log.id);
    return correspondeBusca && correspondeMarcado;
  });

  const exibidos = filtrados;

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


      <LogDetailModal log={logSelecionado} onClose={() => setLogSelecionado(null)} />
    </div>
  );
};
