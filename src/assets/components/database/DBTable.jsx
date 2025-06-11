import React, { useState } from "react";
import {
  RefreshCcw,
  Trash2,
  Eye,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { ModalCadastroDB } from "./ModalCadastroDB";
import { ConfirmModal } from "./ConfirmModal";

const versoesPorTipo = {
  PostgreSQL: ["16", "15.3", "14", "13"],
  MySQL: ["8.0", "5.7", "5.6"],
  MongoDB: ["6.0", "5.0", "4.4"],
  Oracle: ["21c", "19c", "12c"],
  "SQL Server": ["2022", "2019", "2017"],
  SQLite: ["3.43", "3.40"],
};

const politicasPadrao = {
  PostgreSQL: ["Criptografia TLS ativa", "Autenticação por senha segura"],
  MySQL: ["Backups diários automáticos", "Firewall por IP"],
  MongoDB: ["Auditoria de comandos", "TLS e autenticação SCRAM"],
  Oracle: ["Criptografia transparente (TDE)", "Roles e privilégios segregados"],
  "SQL Server": ["Always Encrypted", "Auditoria de logins"],
  SQLite: ["Uso local restrito", "Proteção por ACL"],
};

export const DBTable = () => {
  const [dados, setDados] = useState([
    {
      nome: "PostgreSQL - Produção",
      tipo: "PostgreSQL",
      versao: "15.3",
      porta: "5432",
      status: "Ativo",
      tamanho: "12.5 GB",
      ultimoBackup: "2025-06-08 02:34",
      tempoResposta: "34ms",
      servidor: "Servidor-01",
    },
    {
      nome: "MongoDB - Logs",
      tipo: "MongoDB",
      versao: "6.0",
      porta: "27017",
      status: "Indisponível",
      tamanho: "7.8 GB",
      ultimoBackup: "2025-06-01 22:15",
      tempoResposta: "--",
      servidor: "Servidor-02",
    },
  ]);

  const [modalEdicao, setModalEdicao] = useState(null);
  const [modalDetalhes, setModalDetalhes] = useState(null);
  const [modalPolitica, setModalPolitica] = useState(null);
  const [modalExcluir, setModalExcluir] = useState(null);

  const atualizarStatus = (index) => {
    const novosDados = [...dados];
    novosDados[index].status =
      novosDados[index].status === "Ativo" ? "Indisponível" : "Ativo";
    novosDados[index].tempoResposta =
      novosDados[index].status === "Ativo" ? "20ms" : "--";
    setDados(novosDados);
  };

  const editarDB = (index, novoDB) => {
    const novos = [...dados];
    novos[index] = { ...novoDB };
    setDados(novos);
    setModalEdicao(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white dark:bg-neutral-800 shadow rounded-lg">
          <thead>
            <tr className="text-left border-b dark:border-neutral-700 text-black dark:text-white">
              <th className="p-4">Nome</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Versão</th>
              <th className="p-4">Porta</th>
              <th className="p-4">Status</th>
              <th className="p-4">Tamanho</th>
              <th className="p-4">Último Backup</th>
              <th className="p-4">Tempo Resp.</th>
              <th className="p-4">Servidor</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((banco, index) => (
              <tr
                key={index}
                className="border-b dark:border-neutral-700 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                <td className="p-4">{banco.nome}</td>
                <td className="p-4">{banco.tipo}</td>
                <td className="p-4">{banco.versao}</td>
                <td className="p-4">{banco.porta}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      banco.status === "Ativo"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                  >
                    {banco.status}
                  </span>
                </td>
                <td className="p-4">{banco.tamanho}</td>
                <td className="p-4">{banco.ultimoBackup}</td>
                <td className="p-4">{banco.tempoResposta}</td>
                <td className="p-4">{banco.servidor}</td>
                <td className="p-4 flex gap-2 items-center">
                  <Pencil
                    className="w-4 h-4 text-blue-500 cursor-pointer"
                    title="Editar"
                    onClick={() => setModalEdicao({ index, dados: banco })}
                  />
                  <Eye
                    className="w-4 h-4 text-gray-600 dark:text-gray-300 cursor-pointer"
                    title="Detalhes"
                    onClick={() => setModalDetalhes(banco)}
                  />
                  <Trash2
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    title="Excluir"
                    onClick={() => setModalExcluir(index)}
                  />
                  <ShieldCheck
                    className="w-4 h-4 text-purple-500 cursor-pointer"
                    title="Políticas"
                    onClick={() => setModalPolitica(banco)}
                  />
                  <RefreshCcw
                    className="w-4 h-4 text-yellow-500 cursor-pointer"
                    title="Atualizar Status"
                    onClick={() => atualizarStatus(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edição */}
      {modalEdicao && (
        <ModalCadastroDB
          onClose={() => setModalEdicao(null)}
          onSalvar={(dadosEditados) => editarDB(modalEdicao.index, dadosEditados)}
        />
      )}

      {/* Modal de detalhes */}
      {modalDetalhes && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
              Detalhes do Banco
            </h2>
            <ul className="text-sm text-neutral-800 dark:text-neutral-300 space-y-1">
              {Object.entries(modalDetalhes).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <button
                onClick={() => setModalDetalhes(null)}
                className="text-sm text-[#FA565F] hover:underline cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de políticas */}
      {modalPolitica && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
              Políticas de Segurança ({modalPolitica.tipo})
            </h2>
            <ul className="list-disc pl-5 text-sm text-neutral-800 dark:text-neutral-300 space-y-1">
              {(politicasPadrao[modalPolitica.tipo] || []).map((pol, i) => (
                <li key={i}>{pol}</li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <button
                onClick={() => setModalPolitica(null)}
                className="text-sm text-[#FA565F] hover:underline cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {modalExcluir !== null && (
        <ConfirmModal
          titulo="Confirmar exclusão"
          mensagem={`Deseja realmente excluir "${dados[modalExcluir].nome}"? Esta ação não pode ser desfeita.`}
          onCancelar={() => setModalExcluir(null)}
          onConfirmar={() => {
            const novos = dados.filter((_, i) => i !== modalExcluir);
            setDados(novos);
            setModalExcluir(null);
          }}
        />
      )}
    </>
  );
};
