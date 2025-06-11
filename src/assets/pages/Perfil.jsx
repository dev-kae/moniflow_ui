// === Perfil.jsx ===
import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Plus, Trash2, User, Pencil } from 'lucide-react';
import { FotoPerfil } from '../components/perfil/FotoPerfil';
import { AbaInfo } from '../components/perfil/AbaInfo';
import { AbaPlano } from '../components/perfil/AbaPlano';
import { AbaAPIs } from '../components/perfil/AbaAPIs';
import { TabsPerfil } from '../components/perfil/TabsPerfil';
import { PopupAutenticacao } from '../components/perfil/PopupAutenticacao';

const Perfil = () => {
  const [editando, setEditando] = useState(false);
  const [foto, setFoto] = useState(null);
  const fileInputRef = useRef();
  const [tab, setTab] = useState('info');
  const [autenticado, setAutenticado] = useState(false);
  const [popupAtivo, setPopupAtivo] = useState(false);
  const [popupSenha, setPopupSenha] = useState(false);
  const [senhaInput, setSenhaInput] = useState('');
  const [erroSenha, setErroSenha] = useState(false);
  const [podeEditarSenha, setPodeEditarSenha] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [perfil, setPerfil] = useState({
    nome: 'Gabriel Borba',
    email: 'gabriel@exemplo.com',
    senha: '123456',
    telefone: '(11) 91234-5678',
    plano: 'Profissional',
    apiKey: ''
  });

  const confirmarSenha = () => {
    if (senhaInput === perfil.senha && senhaInput !== '') {
      if (popupSenha) setPodeEditarSenha(true);
      if (popupAtivo) setAutenticado(true);
      setSenhaInput('');
      setErroSenha(false);
      setPopupSenha(false);
      setPopupAtivo(false);
    } else {
      setErroSenha(true);
    }
  };

  const cancelarPopup = () => {
    setPopupAtivo(false);
    setPopupSenha(false);
    setSenhaInput('');
    setErroSenha(false);
  };

  const salvarPerfil = () => {
    console.log('Perfil salvo:', perfil);
    // Lógica futura para integração com backend
  };

  const inputBase = 'w-full px-3 py-2 rounded text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#FA565F]';
  const inputBg = 'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600';
  const inputBloqueado = 'bg-neutral-200 text-gray-600 dark:bg-neutral-700 dark:text-neutral-400 pr-10';
  const botaoGradiente = 'cursor-pointer px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#FA565F] to-[#9352F4] hover:opacity-90 transition';

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-900 dark:text-gray-100">
      {(popupSenha || popupAtivo) && (
        <PopupAutenticacao
          popupSenha={popupSenha}
          popupAtivo={popupAtivo}
          senhaInput={senhaInput}
          setSenhaInput={setSenhaInput}
          confirmar={confirmarSenha}
          cancelar={cancelarPopup}
          erroSenha={erroSenha}
        />
      )}

      <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <User size={24} /> Meu Perfil
      </h1>

      <TabsPerfil tab={tab} setTab={setTab} />

      {tab === 'info' && (
        <div className="bg-white dark:bg-neutral-800 shadow dark:shadow-none rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Dados do Usuário</h2>
            <button onClick={() => setEditando(!editando)} className="text-gray-600 hover:text-[#FA565F] dark:text-gray-300 dark:hover:text-[#FA565F] cursor-pointer">
              <Pencil size={18} />
            </button>
          </div>

          <FotoPerfil foto={foto} setFoto={setFoto} editando={editando} fileInputRef={fileInputRef} />

          <AbaInfo
            perfil={perfil}
            setPerfil={setPerfil}
            editando={editando}
            setPopupSenha={setPopupSenha}
            podeEditarSenha={podeEditarSenha}
            mostrarSenha={mostrarSenha}
            setMostrarSenha={setMostrarSenha}
            inputBase={inputBase}
            inputBg={inputBg}
            inputBloqueado={inputBloqueado}
            botaoGradiente={botaoGradiente}
            setEditando={setEditando}
            setPodeEditarSenha={setPodeEditarSenha}
          />
        </div>
      )}

      {tab === 'plano' && <AbaPlano perfil={perfil} />}

      {tab === 'apis' && (
        <AbaAPIs
          perfil={perfil}
          setPerfil={setPerfil}
          autenticado={autenticado}
          setPopupAtivo={setPopupAtivo}
          botaoGradiente={botaoGradiente}
          salvarPerfil={salvarPerfil}
        />
      )}
    </div>
  );
};

export default Perfil;
