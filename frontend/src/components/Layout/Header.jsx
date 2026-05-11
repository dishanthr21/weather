/**
 * Header Component
 * Top navigation bar with user info and theme toggle
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../Common/ThemeToggle';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">
            <span className="header-icon">🌤️</span>
            Weather Forecast
          </h1>
        </div>
        
        <div className="header-right">
          <ThemeToggle />
          
          <div className="user-menu">
            <span className="user-name">👋 {user?.name}</span>
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
