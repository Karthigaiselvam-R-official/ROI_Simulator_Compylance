import React from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Calculator className="logo-icon" />
          <div>
            <h1 className="header-title">InvoiceFlow ROI</h1>
            <p className="header-subtitle">Automation Payback Calculator</p>
          </div>
        </div>
        <div className="header-badge">
          <TrendingUp size={16} />
          <span>Real-time Analysis</span>
        </div>
      </div>
    </header>
  );
};

export default Header;