// src/App.js
import React from 'react';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import './App.css'; // Opcional, para estilos básicos

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <UserProfile />
      </main>
    </div>
  );
}

export default App;