// === AbaInfo.jsx ===
import React from 'react';
import { KeyRound, Eye, EyeOff, Lock } from 'lucide-react';

export const AbaInfo = ({
  perfil,
  setPerfil,
  editando,
  setPopupSenha,
  podeEditarSenha,
  mostrarSenha,
  setMostrarSenha,
  inputBase,
  inputBg,
  inputBloqueado,
  botaoGradiente,
  salvarPerfil // ⬅ nova prop
}) => (
  <div className="grid gap-4">
    {['nome', 'email', 'telefone'].map(campo => (
      <div key={campo}>
        <label htmlFor={campo} className="block text-sm font-medium mb-1 capitalize">{campo}</label>
        <input
          id={campo}
          className={`${inputBase} ${inputBg}`}
          value={perfil[campo]}
          onChange={e => setPerfil({ ...perfil, [campo]: e.target.value })}
          disabled={!editando}
        />
      </div>
    ))}

    <div>
      <label className="block text-sm font-medium mb-1 flex items-center gap-2">
        Senha
        {editando && (
          <button
            onClick={() => setPopupSenha(true)}
            className="text-xs text-[#FA565F] hover:underline cursor-pointer flex items-center gap-1"
          >
            <KeyRound size={14} /> Alterar
          </button>
        )}
      </label>
      <div className="relative">
        <input
          type={mostrarSenha ? 'text' : 'password'}
          className={`${inputBase} ${inputBg} pr-10`}
          value={perfil.senha}
          onChange={e => setPerfil({ ...perfil, senha: e.target.value })}
          disabled={!editando || !podeEditarSenha}
        />
        {editando && podeEditarSenha && (
          <span
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-[#FA565F] cursor-pointer"
          >
            {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Plano Atual</label>
      <div className="relative">
        <input
          className={`${inputBase} ${inputBg} text-gray-600 dark:text-neutral-300 cursor-not-allowed pr-10`}
          value={perfil.plano}
          disabled
        />
        {editando && (
          <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        )}
      </div>
    </div>

    {editando && (
      <div className="text-right">
        <button onClick={salvarPerfil} className={botaoGradiente}>Salvar Alterações</button>
      </div>
    )}
  </div>
);
