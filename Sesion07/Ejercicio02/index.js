// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext'; // ¡Importamos nuestro Provider!

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envolvemos toda la aplicación con UserProvider. [cite: 1129] */}
    {/* Ahora, App y todos sus componentes descendientes pueden consumir el UserContext. */}
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);