import React from 'react';
import { Calculator, FolderOpen } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'simulate', label: 'ROI Calculator', icon: Calculator },
    { id: 'scenarios', label: 'Saved Scenarios', icon: FolderOpen },
  ];

  return (
    <nav className="navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;