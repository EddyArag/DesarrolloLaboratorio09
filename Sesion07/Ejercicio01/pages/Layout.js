// src/pages/Layout.js
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header style={{ padding: '1rem', background: '#333', color: 'white' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/articulos" style={{ color: 'white', textDecoration: 'none' }}>Artículos</Link>
        </nav>
      </header>

      <main style={{ padding: '20px', minHeight: '80vh' }}>
        {/* Aquí se renderizarán las rutas hijas, cumpliendo el Requisito 1 */}
        <Outlet /> 
      </main>

      <footer style={{ padding: '1rem', background: '#f0f0f0', textAlign: 'center' }}>
        <p>© 2025 Mi Blog con React Router</p>
      </footer>
    </>
  );
};

export default Layout;