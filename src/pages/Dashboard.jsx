import React, { Component } from "react";
import DashboardStatus from "../compoments/DashboardStatus";
import DashboardImpactGraphic from "../compoments/DashboardImpactGraphic";
import DashboardAlerts from "../compoments/DashboardAlerts";

export class Dashboard extends Component {
  render() {
    return (
      <>
        <div>
          <div className="p-4 grid m-auto gap-4 md:grid-cols-1 lg:grid-cols-2">
            <DashboardStatus />
            <DashboardImpactGraphic />
          </div>
          <div className="p-4">
            <DashboardAlerts />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
