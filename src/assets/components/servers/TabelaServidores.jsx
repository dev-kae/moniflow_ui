import { MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FloatingMenu } from "./FloatingMenu";

export const TabelaServidores = ({ servidores, onNovoServidor, onEditarServidor, onExcluirServidor }) => {
  const [menuAtivo, setMenuAtivo] = useState(null);
  const [coords, setCoords] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAtivo(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Lista de Servidores
        </h2>
        <button
          onClick={onNovoServidor}
          className="px-4 py-2 bg-gradient-to-r from-[#FA565F] to-[#9352F4] text-white text-sm rounded-md hover:opacity-90 cursor-pointer"
        >
          Adicionar Servidor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-md overflow-hidden">
          <thead>
            <tr className="bg-neutral-200 dark:bg-neutral-800 text-left text-sm text-black dark:text-white">
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700">Nome</th>
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700">IP</th>
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700">Sistema</th>
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700">Grupo</th>
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700">Ambiente</th>
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700">Status</th>
              <th className="p-3 border-b border-neutral-300 dark:border-neutral-700 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {servidores.map((srv, idx) => (
              <tr key={srv.id} className="text-sm border-b border-neutral-200 dark:border-neutral-700">
                <td className="p-3 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800">{srv.nome}</td>
                <td className="p-3 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800">{srv.ip}</td>
                <td className="p-3 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800">{srv.sistema}</td>
                <td className="p-3 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800">{srv.grupo}</td>
                <td className="p-3 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800">{srv.ambiente}</td>
                <td className="p-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    srv.status === "Online"
                      ? "bg-green-100 text-green-700"
                      : srv.status === "Autenticando"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {srv.status}
                  </span>
                </td>
                <td className="p-3 text-right relative z-10">
                  <button
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setCoords({ x: rect.right - 130, y: rect.bottom + 4 });
                      setMenuAtivo(menuAtivo === idx ? null : idx);
                    }}
                    className="p-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {menuAtivo === idx && coords && (
                    <FloatingMenu x={coords.x} y={coords.y}>
                      <div ref={menuRef}>
                        <button
                          onClick={() => {
                            setMenuAtivo(null);
                            onEditarServidor(srv);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 text-black dark:text-white"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setMenuAtivo(null);
                            onExcluirServidor(srv);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 text-red-600"
                        >
                          Excluir
                        </button>
                      </div>
                    </FloatingMenu>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
