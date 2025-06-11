export const AbaPlano = ({ perfil }) => (
  <div className="bg-white dark:bg-neutral-800 shadow dark:shadow-none rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Detalhes do Plano</h2>
    <ul className="list-disc list-inside space-y-2">
      <li>Nome do plano: {perfil.plano}</li>
      <li>Recursos: Monitoramento em tempo real, alertas inteligentes, API dedicada</li>
      <li>Status: Ativo</li>
      <li>Renovação: 30/12/2025</li>
    </ul>
  </div>
);
