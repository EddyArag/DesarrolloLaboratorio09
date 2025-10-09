// src/context/UserContext.js
import React, { createContext, useState } from 'react';

// 1. Crear el Contexto [cite: 1172]
// Esta función crea el objeto de contexto que los componentes usarán para "sintonizar" el estado global.
export const UserContext = createContext();

// 2. Crear el Componente Proveedor (Provider) [cite: 1180]
// Este componente gestionará el estado y lo "transmitirá" a todos sus hijos.
export const UserProvider = ({ children }) => {
  // Definimos el estado inicial del usuario.
  const [session, setSession] = useState({
    isAuthenticated: false, // Por defecto, el usuario no está autenticado.
    user: null, // No hay información de usuario al inicio.
  });

  // Función para iniciar sesión.
  // Actualiza el estado para reflejar que el usuario está autenticado y guarda sus datos.
  const login = (userData) => {
    setSession({
      isAuthenticated: true,
      user: userData,
    });
  };

  // Función para cerrar sesión.
  // Restablece el estado a sus valores iniciales.
  const logout = () => {
    setSession({
      isAuthenticated: false,
      user: null,
    });
  };

  // El componente Provider envuelve a sus hijos y les pasa el estado y las funciones a través de la prop `value`. [cite: 506]
  // Cualquier componente dentro de este Provider podrá acceder a `isAuthenticated`, `user`, `login`, y `logout`.
  return (
    <UserContext.Provider value={{ ...session, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};