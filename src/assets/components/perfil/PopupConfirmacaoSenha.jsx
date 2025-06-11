import { X } from 'lucide-react';

export const PopupConfirmacaoSenha = ({ onConfirmar, onCancelar }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-sm shadow-lg relative">
      <button
        onClick={onCancelar}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
      >
        <X size={20} />
      </button>
      <h2 className="text-lg font-semibold mb-4">Confirmar Alteração de Senha</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        Tem certeza que deseja alterar sua senha agora? Essa ação poderá estar sujeita a um período de bloqueio para novas alterações.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancelar}
          className="cursor-pointer px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmar}
          className="cursor-pointer px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#FA565F] to-[#9352F4] hover:opacity-90"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
);
