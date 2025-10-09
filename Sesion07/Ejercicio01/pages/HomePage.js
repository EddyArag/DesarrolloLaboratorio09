// src/pages/HomePage.js
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';

const HomePage = () => {
  const navigate = useNavigate(); // Hook para la navegación programática

  const readRandomArticle = () => {
    // Requisito 6: Obtener un ID aleatorio y redirigir
    const randomArticle = articles[Math.floor(Math.random() * articles.length)];
    navigate(`/articulos/${randomArticle.id}`);
  };

  return (
    <div>
      <h1>Bienvenido a Mi Blog de Tecnología</h1>
      <p>Aquí encontrarás los mejores artículos sobre desarrollo web moderno.</p>
      {/* Requisito 2 y 6: Botón para navegación programática */}
      <button onClick={readRandomArticle} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Leer un Artículo Aleatorio
      </button>
    </div>
  );
};

export default HomePage;