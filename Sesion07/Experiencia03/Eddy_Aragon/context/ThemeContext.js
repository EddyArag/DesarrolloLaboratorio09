import { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
// Este objeto será el que los componentes usarán para consumir el estado.
const ThemeContext = createContext();

// 2. Crear el Proveedor del Contexto
// Este es un componente que gestionará el estado y lo proveerá a sus hijos.
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Estado inicial: claro

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Pasamos tanto el valor del tema como la función para cambiarlo.
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Crear un Hook personalizado para usar el contexto (opcional pero buena práctica)
// Esto simplifica el uso del contexto en otros componentes.
export const useTheme = () => {
  return useContext(ThemeContext);
};