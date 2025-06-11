import { useSidebar } from "../../context/SidebarContext";
import { Network, Eye, Trash2, RefreshCcw, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { ModalCadastroEndpoint } from "../components/endpoints/ModalCadastroEndpoint";
import { ModalDetalhesEndpoint } from "../components/endpoints/ModalDetalhesEndpoint";
import { ConfirmModal } from "../components/endpoints/ConfirmModal";

export const Endpoints = () => {
  const { collapsed } = useSidebar();

  const [endpoints, setEndpoints] = useState([
    {
      nome: "Login API",
      url: "https://api.moniflow.com/login",
      metodo: "POST",
      status: "Online",
      codigoResposta: 200,
      tempoResposta: "120ms",
      autenticacao: true,
      servidor: "Servidor-01",
    },
    {
      nome: "Serviço de Alertas",
      url: "https://api.moniflow.com/alertas",
      metodo: "GET",
      status: "Lento",
      codigoResposta: 200,
      tempoResposta: "830ms",
      autenticacao: true,
      servidor: "Servidor-02",
    },
  ]);

  const [modalCadastroAtivo, setModalCadastroAtivo] = useState(false);
  const [modalEditarIndex, setModalEditarIndex] = useState(null);
  const [modalDetalhes, setModalDetalhes] = useState(null);
  const [modalExcluirIndex, setModalExcluirIndex] = useState(null);

  const handleSalvar = (dados) => {
    if (modalEditarIndex !== null) {
      const atualizados = [...endpoints];
      atualizados[modalEditarIndex] = {
        ...atualizados[modalEditarIndex],
        ...dados,
      };
      setEndpoints(atualizados);
      setModalEditarIndex(null);
    } else {
      setEndpoints([
        ...endpoints,
        {
          ...dados,
          status: "Online",
          codigoResposta: 200,
          tempoResposta: "100ms",
        },
      ]);
    }
  };

  const atualizarStatus = (index) => {
    const atualizados = [...endpoints];
    const statusAtual = atualizados[index].status;
    atualizados[index].status =
      statusAtual === "Online"
        ? "Fora do Ar"
        : statusAtual === "Fora do Ar"
        ? "Lento"
        : "Online";
    atualizados[index].codigoResposta =
      atualizados[index].status === "Online" ? 200 : atualizados[index].status === "Lento" ? 200 : 504;
    atualizados[index].tempoResposta =
      atualizados[index].status === "Online"
        ? "98ms"
        : atualizados[index].status === "Lento"
        ? "880ms"
        : "--";
    setEndpoints(atualizados);
  };

  return (
    <div className={`pt-5 px-6 pb-10 transition-all duration-300 ${collapsed ? "pl-20" : "pl-64"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2 text-black dark:text-white">
            <Network className="h-6 w-6 text-[#FA565F]" /> Endpoints
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Verificação de conectividade e disponibilidade dos serviços.
          </p>
        </div>
        <button
          onClick={() => setModalCadastroAtivo(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white text-sm font-medium px-4 py-2 rounded-md shadow cursor-pointer hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white dark:bg-neutral-800 shadow rounded-lg">
          <thead>
            <tr className="text-left border-b dark:border-neutral-700 text-black dark:text-white">
              <th className="p-4">Nome</th>
              <th className="p-4">Método</th>
              <th className="p-4">URL</th>
              <th className="p-4">Status</th>
              <th className="p-4">Código</th>
              <th className="p-4">Resp.</th>
              <th className="p-4">Autenticação</th>
              <th className="p-4">Servidor</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((ep, index) => (
              <tr
                key={index}
                className="border-b dark:border-neutral-700 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <td className="p-4">{ep.nome}</td>
                <td className="p-4">{ep.metodo}</td>
                <td className="p-4 max-w-[240px] truncate">{ep.url}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ep.status === "Online"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : ep.status === "Lento"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                  >
                    {ep.status}
                  </span>
                </td>
                <td className="p-4">{ep.codigoResposta}</td>
                <td className="p-4">{ep.tempoResposta}</td>
                <td className="p-4">{ep.autenticacao ? "Sim" : "Não"}</td>
                <td className="p-4">{ep.servidor}</td>
                <td className="p-4 flex gap-2 items-center">
                  <Pencil
                    className="w-4 h-4 text-blue-500 cursor-pointer"
                    title="Editar"
                    onClick={() => setModalEditarIndex(index)}
                  />
                  <Eye
                    className="w-4 h-4 text-gray-600 dark:text-gray-300 cursor-pointer"
                    title="Detalhes"
                    onClick={() => setModalDetalhes(ep)}
                  />
                  <Trash2
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    title="Excluir"
                    onClick={() => setModalExcluirIndex(index)}
                  />
                  <RefreshCcw
                    className="w-4 h-4 text-yellow-500 cursor-pointer"
                    title="Atualizar"
                    onClick={() => atualizarStatus(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modais */}
      {modalCadastroAtivo && (
        <ModalCadastroEndpoint
          onClose={() => setModalCadastroAtivo(false)}
          onSalvar={handleSalvar}
        />
      )}

      {modalEditarIndex !== null && (
        <ModalCadastroEndpoint
          dadosIniciais={endpoints[modalEditarIndex]}
          onClose={() => setModalEditarIndex(null)}
          onSalvar={handleSalvar}
        />
      )}

      {modalDetalhes && (
        <ModalDetalhesEndpoint
          endpoint={modalDetalhes}
          onClose={() => setModalDetalhes(null)}
        />
      )}

      {modalExcluirIndex !== null && (
        <ConfirmModal
          titulo="Confirmar exclusão"
          mensagem={`Deseja remover o endpoint "${endpoints[modalExcluirIndex].nome}"? Essa ação não pode ser desfeita.`}
          onCancelar={() => setModalExcluirIndex(null)}
          onConfirmar={() => {
            setEndpoints(endpoints.filter((_, i) => i !== modalExcluirIndex));
            setModalExcluirIndex(null);
          }}
        />
      )}
    </div>
  );
};
