import React from "react";

export const ConfirmModal = ({ titulo, mensagem, onConfirmar, onCancelar }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
          {titulo}
        </h2>

        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          {mensagem}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancelar}
            className="text-sm px-4 py-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:underline cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirmar}
            className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white hover:opacity-90 cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
