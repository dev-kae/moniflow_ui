import React, { useState, useEffect } from "react";

export const ModalCadastroEndpoint = ({ onClose, onSalvar, dadosIniciais = null }) => {
  const [form, setForm] = useState({
    nome: "",
    url: "",
    metodo: "GET",
    autenticacao: false,
    servidor: "",
  });

  const servidoresDisponiveis = ["Servidor-01", "Servidor-02", "Servidor-03"];

  useEffect(() => {
    if (dadosIniciais) setForm(dadosIniciais);
  }, [dadosIniciais]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSalvar(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          {dadosIniciais ? "Editar Endpoint" : "Cadastrar Endpoint"}
        </h2>

        <div className="space-y-3">
          <input
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white"
          />

          <input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white"
          />

          <select
            name="metodo"
            value={form.metodo}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>

          <select
            name="servidor"
            value={form.servidor}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-border bg-white text-black dark:bg-neutral-700 dark:text-white"
          >
            <option value="">Selecione o servidor</option>
            {servidoresDisponiveis.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <input
              type="checkbox"
              name="autenticacao"
              checked={form.autenticacao}
              onChange={handleChange}
            />
            Autenticação necessária
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:underline cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white hover:opacity-90 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
