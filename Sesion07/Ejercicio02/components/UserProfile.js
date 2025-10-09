// src/components/UserProfile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
  // Consumimos `isAuthenticated` y `user` de nuestro contexto.
  const { isAuthenticated, user } = useContext(UserContext);

  // Si el usuario no está autenticado, el componente no renderiza nada.
  if (!isAuthenticated) {
    return null; // O puedes mostrar un mensaje como <p>No hay sesión activa.</p>
  }

  // Si el usuario sí está autenticado, muestra su información. [cite: 1142]
  return (
    <div style={{ margin: '20px auto', padding: '20px', border: '1px solid #ccc', maxWidth: '400px' }}>
      <h2>Perfil del Usuario</h2>
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserProfile;