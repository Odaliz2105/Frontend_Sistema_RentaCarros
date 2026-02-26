import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: '🏠',
      label: 'Inicio',
      description: 'Panel principal'
    },
    {
      path: '/clientes',
      icon: '👥',
      label: 'Clientes',
      description: 'Gestión de clientes'
    },
    {
      path: '/vehiculos',
      icon: '🚗',
      label: 'Vehículos',
      description: 'Gestión de vehículos'
    },
    {
      path: '/reservas',
      icon: '📅',
      label: 'Reservas',
      description: 'Gestión de reservas'
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">🚗</div>
          {!isCollapsed && (
            <div className="logo-text">
              <h3>RentaCar</h3>
              <p>Sistema de Gestión</p>
            </div>
          )}
        </div>
        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expandir' : 'Contraer'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && (
                  <div className="nav-content">
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="footer-content">
            <p className="version">v1.0.0</p>
            <p className="copyright">© 2025 RentaCar System</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;