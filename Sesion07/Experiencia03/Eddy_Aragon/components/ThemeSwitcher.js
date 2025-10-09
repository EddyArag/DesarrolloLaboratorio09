import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  // Usamos el hook para obtener el tema y la función para cambiarlo
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{ padding: '10px', margin: '10px' }}>
      Cambiar a modo {theme === 'light' ? 'oscuro' : 'claro'}
    </button>
  );
};

export default ThemeSwitcher;