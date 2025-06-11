export const AlertaCard = ({ icone, titulo, descricao }) => (
  <div className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
    {icone}
    <div>
      <h3 className="text-base font-semibold text-black dark:text-white">{titulo}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{descricao}</p>
    </div>
  </div>
);
