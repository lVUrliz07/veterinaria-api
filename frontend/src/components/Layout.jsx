import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <h1 className="logo">Veterinaria</h1>
        <nav className="nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/personas" className="nav-link">Personas</Link>
          <Link to="/mascotas" className="nav-link">Mascotas</Link>
          <Link to="/consultas" className="nav-link">Consultas</Link>
          <Link to="/veterinarios" className="nav-link">Veterinarios</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;