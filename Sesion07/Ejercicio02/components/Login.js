// src/components/Login.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
  // Usamos el hook `useContext` para acceder a las funciones de nuestro contexto. [cite: 1178]
  const { login } = useContext(UserContext);

  // Función que se ejecuta al hacer clic en el botón.
  const handleLogin = () => {
    // Datos de usuario predefinidos para la simulación.
    const userData = {
      name: 'Luis Delgado',
      email: 'luis.delgado@estudiante.ucsm.edu.pe',
    };
    // Llamamos a la función `login` del contexto para actualizar el estado global. [cite: 1135]
    login(userData);
  };

  return <button onClick={handleLogin}>Iniciar Sesión</button>;
};

export default Login;