import React, { Component } from "react";
import { AlertTriangle, Database, Globe, Server } from "lucide-react";

export class DashboardStatus extends Component {
  render() {
    return (
      <div className="grid p-4 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-lg bg-neutral-800 p-4 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm text-blue-400 font-medium">Servidores</h3>
            <Server className="h-4 w-4 text-fuchsia-50" />
          </div>
          <div className="text-2xl font-bold">12/14</div>
          <p className="text-xs text-gray-500">Servidores online</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
            <span className="text-sm text-neutral-800 font-medium">85%</span>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-neutral-800 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm text-blue-400 font-medium">
              Bancos de Dados
            </h3>
            <Database className="h-4 w-4 text-fuchsia-50" />
          </div>
          <div className="text-2xl font-bold">8/8</div>
          <p className="text-xs text-gray-500">Bancos online</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <span className="text-sm font-medium">100%</span>
          </div>
        </div>
        <div className="rounded-lg p-4 bg-neutral-800 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm text-blue-400 font-medium">APIs</h3>
            <Globe className="h-4 w-4 text-fuchsia-50" />
          </div>
          <div className="text-2xl font-bold">18/20</div>
          <p className="text-xs text-gray-500">APIs respondendo</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "90%" }}
              ></div>
            </div>
            <span className="text-sm font-medium">90%</span>
          </div>
        </div>

        <div className="rounded-lg bg-neutral-800 p-4 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm text-blue-400 font-medium">Alertas</h3>
            <AlertTriangle className="h-4 w-4 text-fuchsia-50" />
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs  text-gray-500">Alertas ativos</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Crítico: 1
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Médio: 2
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardStatus;
