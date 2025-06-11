// DBs.jsx
import React, { useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { Database, Plus } from "lucide-react";
import { DBTable } from "../components/database/DBTable";
import { ModalCadastroDB } from "../components/database/ModalCadastroDB";

export const DBs = () => {
  const { collapsed } = useSidebar();
  const [modalAtivo, setModalAtivo] = useState(false);

  const handleSalvar = (novoDB) => {
    console.log("Novo banco salvo:", novoDB);
    // Aqui você poderia dar push no estado ou enviar para a API
  };

  return (
    <div className={`pt-5 pb-10 transition-all duration-300 ${collapsed ? "pl-20 pr-6" : "pl-64 pr-6"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2 text-black dark:text-white">
            <Database className="h-6 w-6 text-[#FA565F]" /> DBs Monitorados
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Monitoramento de instâncias e uso dos bancos de dados.
          </p>
        </div>
        <button
          onClick={() => setModalAtivo(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white text-sm font-medium px-4 py-2 rounded-md shadow cursor-pointer hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Adicionar DB
        </button>
      </div>

      <DBTable />

      {modalAtivo && (
        <ModalCadastroDB
          onClose={() => setModalAtivo(false)}
          onSalvar={handleSalvar}
        />
      )}
    </div>
  );
};