import React from "react";
import { tipoCores } from "./tagStyles";

export const TipoTag = ({ tipo, ativo, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer text-xs px-3 py-1 rounded-full select-none border border-transparent font-medium transition-colors duration-200 ${
        ativo ? tipoCores[tipo] : "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
      }`}
    >
      {tipo}
    </span>
  );
};
