// === AbaAPIs.jsx ===
import React, { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Copy } from 'lucide-react';

export const AbaAPIs = ({ perfil, setPerfil, autenticado, setPopupAtivo, botaoGradiente, salvarPerfil }) => {
  const [mostrarApiKey, setMostrarApiKey] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiarParaClipboard = () => {
    navigator.clipboard.writeText(perfil.apiKey);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const apiKeyVisivel = mostrarApiKey || !autenticado ? perfil.apiKey.replace(/./g, '*') : perfil.apiKey;

  return (
    <div className="bg-white dark:bg-neutral-800 shadow dark:shadow-none rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">API Key</h2>
        {!autenticado && (
          <button onClick={() => setPopupAtivo(true)} className="text-sm text-[#FA565F] hover:underline cursor-pointer">Autenticar</button>
        )}
      </div>

      {perfil.apiKey ? (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 rounded text-gray-900 dark:text-white bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 outline-none focus:ring-2 focus:ring-[#FA565F] pr-20"
              value={apiKeyVisivel}
              disabled
            />
            {autenticado && (
              <span onClick={() => setMostrarApiKey(!mostrarApiKey)} className="absolute top-1/2 right-10 -translate-y-1/2 text-gray-500 hover:text-[#FA565F] cursor-pointer">
                {mostrarApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            )}
            <span onClick={copiarParaClipboard} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-[#FA565F] cursor-pointer">
              <Copy size={18} />
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className={botaoGradiente}
              onClick={() => setPerfil({ ...perfil, apiKey: crypto.randomUUID() })}
            >
              <Plus size={16} className="inline mr-1" /> Gerar Nova
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              onClick={() => setPerfil({ ...perfil, apiKey: '' })}
            >
              <Trash2 size={16} className="inline mr-1" /> Revogar
            </button>
          </div>
          <div className="text-right">
            <button
              onClick={salvarPerfil}
              className={botaoGradiente}
            >
              Salvar Alterações
            </button>
          </div>
          {copiado && <p className="text-sm text-green-500">Chave copiada para a área de transferência!</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <button
            className={botaoGradiente}
            onClick={() => setPerfil({ ...perfil, apiKey: crypto.randomUUID() })}
          >
            <Plus size={16} className="inline mr-1" /> Criar Primeira Chave
          </button>
        </div>
      )}
    </div>
  );
};
