export const ServidoresResumo = ({ servidores }) => {
  const total = servidores.length;
  const online = servidores.filter((s) => s.status === "Online").length;
  const offline = total - online;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
        <p className="text-xl font-bold text-black dark:text-white">{total}</p>
      </div>
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Online</p>
        <p className="text-xl font-bold text-green-600 dark:text-green-400">{online}</p>
      </div>
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Offline</p>
        <p className="text-xl font-bold text-red-600 dark:text-red-400">{offline}</p>
      </div>
    </div>
  );
};
