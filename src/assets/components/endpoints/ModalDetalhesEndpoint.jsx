import React from "react";

export const ModalDetalhesEndpoint = ({ endpoint, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Detalhes do Endpoint
        </h2>

        <ul className="text-sm text-neutral-800 dark:text-neutral-300 space-y-1">
          {Object.entries(endpoint).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>

        <div className="text-right mt-6">
          <button
            onClick={onClose}
            className="text-sm text-[#FA565F] hover:underline cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
