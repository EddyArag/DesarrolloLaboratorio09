// src/components/Header.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Login from './Login';

const Header = () => {
  // Consumimos el estado de autenticación, la información del usuario y la función `logout` del contexto.
  const { isAuthenticated, user, logout } = useContext(UserContext);

  return (
    <header style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <h1>Aplicación con Gestión de Sesión</h1>
      {
        // Renderizado condicional:
        // Si `isAuthenticated` es true...
        isAuthenticated ? (
          <div>
            {/* ...mostramos el mensaje de bienvenida y el botón para cerrar sesión. [cite: 1141] */}
            <h2>Hola, {user.name}</h2>
            <button onClick={logout}>Cerrar Sesión</button>
          </div>
        ) : (
          // Si `isAuthenticated` es false...
          <div>
            {/* ...mostramos el componente de Login. [cite: 1140] */}
            <p>Por favor, inicia sesión para continuar.</p>
            <Login />
          </div>
        )
      }
    </header>
  );
};

export default Header;