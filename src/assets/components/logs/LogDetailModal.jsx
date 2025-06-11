import React from "react";

export const LogDetailModal = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Detalhes do Log #{log.id}
        </h2>
        <div className="space-y-2 text-sm text-black dark:text-white">
          <p><strong>Nome:</strong> {log.nome}</p>
          <p><strong>Tipo:</strong> {log.tipo}</p>
          <p><strong>Descrição:</strong> {log.descricao}</p>
          <p><strong>Data:</strong> {log.data}</p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:underline cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
