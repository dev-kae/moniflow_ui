import React, { Component } from "react";
import { XCircle, AlertTriangle, CheckCircle } from "lucide-react";

export class DashboardAlerts extends Component {
  render() {
    return (
      <div className="px-4">
        <div className="rounded-lg bg-neutral-800 shadow-sm w-full">
          {/* Cabeçalho */}
          <div className="p-4 border-b border-neutral-700">
            <h3 className="text-lg font-medium text-white">Alertas Recentes</h3>
            <p className="text-sm text-gray-400">
              Últimos alertas detectados pelo sistema
            </p>
          </div>

          {/* Lista de alertas */}
          <div className="p-4 overflow-x-auto">
            <div className="space-y-4 min-w-[300px]">
              {/* Alerta crítico */}
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-700 p-4">
                <div className="rounded-full bg-red-100 p-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-white">
                      Servidor srv-prod-03 offline
                    </p>
                    <span className="mt-1 sm:mt-0 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Crítico
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    O servidor não responde há 15 minutos
                  </p>
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">12:45</div>
              </div>

              {/* Alerta médio - CPU */}
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-700 p-4">
                <div className="rounded-full bg-yellow-100 p-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-white">
                      Uso de CPU elevado em srv-prod-04
                    </p>
                    <span className="mt-1 sm:mt-0 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Médio
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    CPU acima de 50% por mais de 10 minutos
                  </p>
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">11:32</div>
              </div>

              {/* Alerta médio - Latência */}
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-700 p-4">
                <div className="rounded-full bg-yellow-100 p-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-white">
                      Latência elevada na API de pagamentos
                    </p>
                    <span className="mt-1 sm:mt-0 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Médio
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Tempo de resposta acima de 500ms
                  </p>
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">10:15</div>
              </div>

              {/* Alerta resolvido */}
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-neutral-700 p-4">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-white">
                      Banco de dados principal restaurado
                    </p>
                    <span className="mt-1 sm:mt-0 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full border border-green-200">
                      Resolvido
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Conexão restabelecida após manutenção
                  </p>
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">09:22</div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="p-4 border-t border-neutral-700 w-full">
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-800">
              Ver todos os alertas
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardAlerts;
