// src/pages/ArticlesPage.js
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const ArticlesPage = () => {
  return (
    <div>
      <h2>Todos Nuestros Artículos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* Requisito 3: Lista de artículos con Link a la página de detalle */}
        {articles.map(article => (
          <li key={article.id} style={{ marginBottom: '10px' }}>
            <Link to={`/articulos/${article.id}`} style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.1rem' }}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;