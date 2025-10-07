import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import './layout.css';

const Layout = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="app-container">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;