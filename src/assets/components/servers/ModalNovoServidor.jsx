import { useState } from "react";
import { MoreVertical } from "lucide-react";

export const ModalNovoServidor = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    nome: "",
    ip: "",
    sistema: "Linux",
    grupo: "",
    ambiente: "Produção",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Você precisa estar autenticado.");

    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    if (!ipv4Regex.test(form.ip)) return alert("Endereço IP inválido. Use o formato IPv4.");

    const now = new Date();
    const checkin = now.toISOString().slice(0, 16).replace("T", " ");
    const novo = {
      ...form,
      id: Date.now(),
      checkin,
      cpu: "0%",
      ram: "0%",
      armazenamento: "0GB / 0GB",
      uptime: "0 dias",
      token,
      status: "Autenticando"
    };

    onSave(novo);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Novo Servidor
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">
              Nome do Servidor
            </label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full rounded-md border border-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FA565F]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">
              Endereço IP
            </label>
            <input
              name="ip"
              value={form.ip}
              onChange={handleChange}
              className="w-full rounded-md border border-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FA565F]"
              placeholder="Ex: 192.168.1.100"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">
              Sistema Operacional
            </label>
            <select
              name="sistema"
              value={form.sistema}
              onChange={handleChange}
              className="w-full rounded-md border border-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FA565F]"
            >
              <option>Linux</option>
              <option>Ubuntu</option>
              <option>Debian</option>
              <option>CentOS</option>
              <option>Red Hat</option>
              <option>Windows Server 2019</option>
              <option>Windows Server 2022</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">Grupo</label>
            <input
              name="grupo"
              value={form.grupo}
              onChange={handleChange}
              className="w-full rounded-md border border-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FA565F]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">Ambiente</label>
            <select
              name="ambiente"
              value={form.ambiente}
              onChange={handleChange}
              className="w-full rounded-md border border-border dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FA565F]"
            >
              <option>Produção</option>
              <option>Homologação</option>
              <option>Desenvolvimento</option>
              <option>Teste</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm border border-neutral-300 cursor-pointer dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-black dark:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-sm bg-gradient-to-r cursor-pointer from-[#FA565F] to-[#9352F4] text-white hover:opacity-90"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
