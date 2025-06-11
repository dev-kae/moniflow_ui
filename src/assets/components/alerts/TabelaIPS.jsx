export const TabelaIPs = ({ dados }) => (
  <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
    <h3 className="text-base font-semibold mb-3 text-black dark:text-white">IPs com Atividade Elevada</h3>
    <table className="w-full text-sm">
      <thead className="text-left text-black dark:text-white border-b dark:border-neutral-700">
        <tr>
          <th className="py-2 px-2">IP</th>
          <th className="py-2 px-2">País</th>
          <th className="py-2 px-2">Requests</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((ip, i) => (
          <tr key={i} className="text-black dark:text-white border-b dark:border-neutral-700">
            <td className="py-2 px-2">{ip.ip}</td>
            <td className="py-2 px-2">{ip.pais}</td>
            <td className="py-2 px-2">{ip.requests}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);