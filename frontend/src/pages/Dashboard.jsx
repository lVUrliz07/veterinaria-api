import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Bienvenido a la Veterinaria</h1>
      <p>Gestiona tus mascotas, consultas y más.</p>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Personas</h3>
          <p>Gestiona los dueños de las mascotas.</p>
        </div>
        <div className="card">
          <h3>Mascotas</h3>
          <p>Registra y administra las mascotas.</p>
        </div>
        <div className="card">
          <h3>Consultas</h3>
          <p>Programa y gestiona las consultas veterinarias.</p>
        </div>
        <div className="card">
          <h3>Veterinarios</h3>
          <p>Administra el personal veterinario.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;