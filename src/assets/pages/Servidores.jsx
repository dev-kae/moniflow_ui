import { useSidebar } from "../../context/SidebarContext";
import { Server } from "lucide-react";
import { useState } from "react";
import { ServidoresResumo } from "../components/servers/ServidoresResumo";
import { TabelaServidores } from "../components/servers/TabelaServidores";
import { ModalNovoServidor } from "../components/servers/ModalNovoServidor";

export const Servidores = () => {
  const { collapsed } = useSidebar();
  const [servidores, setServidores] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [servidorEdicao, setServidorEdicao] = useState(null);

  const handleSalvarServidor = (novo) => {
    if (modoEdicao && servidorEdicao) {
      setServidores((prev) =>
        prev.map((s) => (s.id === servidorEdicao.id ? { ...s, ...novo } : s))
      );
    } else {
      setServidores((prev) => [...prev, novo]);
    }
    setMostrarModal(false);
    setModoEdicao(false);
    setServidorEdicao(null);
  };

  const handleEditarServidor = (servidor) => {
    setServidorEdicao(servidor);
    setModoEdicao(true);
    setMostrarModal(true);
  };

  const handleExcluirServidor = (servidor) => {
    if (confirm(`Deseja realmente excluir o servidor "${servidor.nome}"?`)) {
      setServidores((prev) => prev.filter((s) => s.id !== servidor.id));
    }
  };

  return (
    <>
      {mostrarModal && (
        <ModalNovoServidor
          onClose={() => {
            setMostrarModal(false);
            setModoEdicao(false);
            setServidorEdicao(null);
          }}
          onSave={handleSalvarServidor}
          servidorEdicao={modoEdicao ? servidorEdicao : null}
        />
      )}

      <div className={`pt-5 px-6 pb-10 ${collapsed ? "pl-20" : "pl-64"}`}>
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black dark:text-white">
          <Server className="h-6 w-6 text-[#FA565F]" /> Servidores
        </h1>

        <ServidoresResumo servidores={servidores} />

        <TabelaServidores
          servidores={servidores}
          onNovoServidor={() => {
            setModoEdicao(false);
            setServidorEdicao(null);
            setMostrarModal(true);
          }}
          onEditarServidor={handleEditarServidor}
          onExcluirServidor={handleExcluirServidor}
        />
      </div>
    </>
  );
};
