import { X } from 'lucide-react';

export const PopupAutenticacao = ({ popupSenha, popupAtivo, senhaInput, setSenhaInput, confirmar, cancelar, erroSenha }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-sm shadow-lg relative">
      <button onClick={cancelar} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer">
        <X size={20} />
      </button>
      <h2 className="text-lg font-semibold mb-4">
        {popupAtivo ? 'Autenticação Requerida' : 'Confirme sua Senha'}
      </h2>
      <label className="block text-sm font-medium mb-1">Senha</label>
      <input
        type="password"
        className="w-full px-3 py-2 rounded text-gray-900 dark:text-white bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 outline-none focus:ring-2 focus:ring-[#FA565F] mb-1"
        value={senhaInput}
        onChange={(e) => setSenhaInput(e.target.value)}
      />
      {erroSenha && <p className="text-red-500 text-sm">Senha incorreta</p>}
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={cancelar} className="cursor-pointer px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600">
          Cancelar
        </button>
        <button onClick={confirmar} className="cursor-pointer px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#FA565F] to-[#9352F4] hover:opacity-90">
          Confirmar
        </button>
      </div>
    </div>
  </div>
);
