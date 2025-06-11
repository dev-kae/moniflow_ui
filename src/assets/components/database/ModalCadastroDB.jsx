import React, { useState } from "react";

export const ModalCadastroDB = ({ onClose, onSalvar }) => {
  const [form, setForm] = useState({
    nome: "",
    tipo: "PostgreSQL",
    versao: "",
    porta: "",
    servidor: "",
  });

  const tipos = ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQL Server", "SQLite"];

  const versoesPorTipo = {
    PostgreSQL: ["16", "15.3", "14", "13"],
    MySQL: ["8.0", "5.7", "5.6"],
    MongoDB: ["6.0", "5.0", "4.4"],
    Oracle: ["21c", "19c", "12c"],
    "SQL Server": ["2022", "2019", "2017"],
    SQLite: ["3.43", "3.40"],
  };

  const servidoresDisponiveis = ["Servidor-01", "Servidor-02", "Servidor-03"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      versao: name === "tipo" ? "" : prev.versao,
    }));
  };

  const handleSalvar = () => {
    onSalvar(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Cadastrar Novo Banco de Dados
        </h2>

        <div className="space-y-3">
          <input
            name="nome"
            placeholder="Nome do DB"
            value={form.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          <select
            name="versao"
            value={form.versao}
            onChange={handleChange}
            disabled={!versoesPorTipo[form.tipo]}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>Selecione a versão</option>
            {(versoesPorTipo[form.tipo] || []).map((versao) => (
              <option key={versao} value={versao}>
                {versao}
              </option>
            ))}
          </select>

          <input
            name="porta"
            placeholder="Porta"
            type="number"
            value={form.porta}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <select
            name="servidor"
            value={form.servidor}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>Selecione o servidor</option>
            {servidoresDisponiveis.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:underline cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white hover:opacity-90 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
