import React from "react";
import { dropadoCores } from "./tagStyles";

export const DropadoTag = ({ opcao, ativo, onClick }) => {
  const estilo = ativo
    ? dropadoCores[opcao]
    : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300";

  return (
    <span
      onClick={onClick}
      className={`cursor-pointer text-xs px-3 py-1 rounded-full select-none border border-transparent font-medium transition-colors duration-200 ${estilo}`}
    >
      {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
    </span>
  );
};
