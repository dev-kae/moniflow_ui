import React, { Component } from "react";
import { Bell, Search } from "lucide-react";

export class TopMenu extends Component {
  render() {
    const menuSpacing = 2;
    return (
      <div className="flex items-center mr-4">
        <input
          className={`mx-${menuSpacing} bg-neutral-700 rounded-lg`}
          type="text"
        />
        <button className={`mx-${menuSpacing} p-1`}>
          <Search />
        </button>

        <button className={`mx-${menuSpacing} p-1`}>
          <Bell />
        </button>
      </div>
    );
  }
}

export default TopMenu;
