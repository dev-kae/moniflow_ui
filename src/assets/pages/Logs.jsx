import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { FileText, Flag, Filter, X } from "lucide-react";
import { LogsTable } from "../components/logs/LogsTable";
import { LogDetailModal } from "../components/logs/LogDetailModal";
import { tipoCores } from "../components/logs/tagStyles";

export const Logs = () => {
  const { collapsed } = useSidebar();

  const [busca, setBusca] = useState("");
  const [marcados, setMarcados] = useState([]);
  const [filtroMarcadosAtivo, setFiltroMarcadosAtivo] = useState(false);
  const [logSelecionado, setLogSelecionado] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtros, setFiltros] = useState({
    tipos: [],
    dropado: { sim: false, nao: false }
  });

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
    // Filtro de busca
    const correspondeBusca = [log.tipo, log.descricao, log.sistemaOrigem]
      .join(" ")
      .toLowerCase()
      .includes(busca.toLowerCase());
      
    // Filtro de marcados
    const correspondeMarcado = !filtroMarcadosAtivo || marcados.includes(log.id);
    
    // Filtro de tipos
    const tipoOk = filtros.tipos.length === 0 || filtros.tipos.includes(log.tipo);
    
    // Filtro de dropado
    const dropadoOk = 
      (!filtros.dropado.sim && !filtros.dropado.nao) ||
      (filtros.dropado.sim && log.dropado) ||
      (filtros.dropado.nao && !log.dropado);
    
    return correspondeBusca && correspondeMarcado && tipoOk && dropadoOk;
  });

  const exibidos = filtrados;
  
  const toggleTipo = (tipo) => {
    setFiltros(prev => ({
      ...prev,
      tipos: prev.tipos.includes(tipo)
        ? prev.tipos.filter(t => t !== tipo)
        : [...prev.tipos, tipo]
    }));
  };
  
  const toggleDropado = (valor) => {
    setFiltros(prev => ({
      ...prev,
      dropado: {
        ...prev.dropado,
        [valor]: !prev.dropado[valor]
      }
    }));
  };
  
  const limparFiltros = () => {
    setFiltros({
      tipos: [],
      dropado: { sim: false, nao: false }
    });
  };
  
  const temFiltrosAtivos = filtros.tipos.length > 0 || 
                         filtros.dropado.sim || 
                         filtros.dropado.nao;

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
        <div className="flex gap-2 w-full md:w-3/4">
          <input
            type="text"
            placeholder="Buscar por tipo, descrição ou origem..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm bg-popover text-popover-foreground dark:text-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          
          <div className="relative">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                temFiltrosAtivos 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {temFiltrosAtivos && (
                <span className="ml-1 w-2 h-2 rounded-full bg-blue-500"></span>
              )}
            </button>
            
            {mostrarFiltros && (
              <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 z-10 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Filtros</h3>
                  <button 
                    onClick={() => setMostrarFiltros(false)}
                    className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tipo</h4>
                    <div className="flex flex-wrap gap-2">
                      {tipos.map((tipo) => (
                        <button
                          key={tipo}
                          onClick={() => toggleTipo(tipo)}
                          className={`text-xs px-2 py-1 rounded-full border ${
                            filtros.tipos.includes(tipo)
                              ? tipoCores[tipo]
                              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-transparent'
                          }`}
                        >
                          {tipo}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Status</h4>
                    <div className="flex gap-3">
                      {['sim', 'nao'].map((opcao) => (
                        <label key={opcao} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filtros.dropado[opcao]}
                            onChange={() => toggleDropado(opcao)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700"
                          />
                          <span>Dropado {opcao === 'sim' ? 'sim' : 'não'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={limparFiltros}
                    disabled={!temFiltrosAtivos}
                    className={`w-full py-2 text-sm rounded-md ${
                      temFiltrosAtivos
                        ? 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
                        : 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
                    }`}
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setFiltroMarcadosAtivo((prev) => !prev)}
            title="Exibir apenas logs marcados"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              filtroMarcadosAtivo
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <Flag className={`w-4 h-4 ${filtroMarcadosAtivo ? 'fill-current' : ''}`} />
          </button>

        </div>
      </div>

      <LogsTable
        logs={exibidos}
        onDetalhar={setLogSelecionado}
        onMarcar={alternarMarcacao}
        marcados={marcados}
        tipoCores={tipoCores}
      />


      <LogDetailModal log={logSelecionado} onClose={() => setLogSelecionado(null)} />
    </div>
  );
};
