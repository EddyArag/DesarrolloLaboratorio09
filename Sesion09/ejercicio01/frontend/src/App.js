import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistroUsuario from './components/RegistroUsuario';
import ConfirmacionRegistro from './components/ConfirmacionRegistro';
import VentaPasajes from './components/VentaPasajes';
import MatrizPerfecta from './components/MatrizPerfecta';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navigation">
          <Link to="/" className="nav-link">Registro de Usuario</Link>
          <Link to="/pasajes" className="nav-link">Venta de Pasajes</Link>
          <Link to="/matriz" className="nav-link">Matriz Perfecta</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<RegistroUsuario />} />
          <Route path="/confirmacion/:id" element={<ConfirmacionRegistro />} />
          <Route path="/pasajes" element={<VentaPasajes />} />
          <Route path="/matriz" element={<MatrizPerfecta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
