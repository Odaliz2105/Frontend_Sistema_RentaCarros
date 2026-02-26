import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Panel de Control</h1>
            <div className="user-info">
              <span className="welcome-message">
                Bienvenido - {user?.nombre} {user?.apellido}
              </span>
              <button onClick={logout} className="logout-button">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="dashboard-welcome">
            <h2>Bienvenido al Sistema de Renta de Carros</h2>
            <p>Selecciona una opción del menú lateral para comenzar</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <h3>Clientes</h3>
              <p>Gestiona la información de los clientes</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🚗</div>
              <h3>Vehículos</h3>
              <p>Administra el parque automotor</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <h3>Reservas</h3>
              <p>Controla las reservas del sistema</p>
            </div>
          </div>

          <div className="dashboard-info">
            <h3>Información del Sistema</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Usuario:</strong> {user?.email}
              </div>
              <div className="info-item">
                <strong>Rol:</strong> Administrador
              </div>
              <div className="info-item">
                <strong>Estado:</strong> <span className="status-online">En línea</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;