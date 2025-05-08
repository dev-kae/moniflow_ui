import React, { useState } from "react";
import { X, ChevronDown, ChevronRight, AlertTriangle, Database, Globe, LayoutDashboard, Menu, MessageSquare, Server } from "lucide-react";


const SidebarItem = ({ label, icon: Icon, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          <span>{label}</span>
        </div>
        {subItems &&
          (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </div>
      {isOpen && subItems && (
        <div className="ml-6 border-l border-gray-600">
          {subItems.map((item, index) => (
            <div
              key={index}
              className="p-2 pl-4 cursor-pointer hover:bg-gray-700 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const CollapsibleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-neutral-950 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg p-4`}
      >
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Moniflow</h2>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-blue-600 text-white rounded-md"
        >
            <X size={24} />
        </button>
        </div>


        <SidebarItem label="Dashboard" icon={LayoutDashboard} />

        

        <SidebarItem
          label="Servidores"
          icon={Server}
          subItems={["Orders", "Products", "Customers"]}
        />
        <SidebarItem
          label="Banco de Dados"
          icon={Database}
          subItems={["Active", "Archived"]}
        />
        <SidebarItem
          label="APIs"
          icon={Globe}
          subItems={["My Courses", "Enrollments"]}
        />
        <SidebarItem
          label="Alertas"
          icon={AlertTriangle}
          subItems={["My Courses", "Enrollments"]}
        />
        <SidebarItem
          label="Logs"
          icon={MessageSquare}
          subItems={["My Courses", "Enrollments"]}
        />
        
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-[4px] p-2 px-3 bg-blue-600 text-white rounded-md"
      >
        <Menu size={20}/>
      </button>
    </div>
  );
};

export default CollapsibleMenu;
