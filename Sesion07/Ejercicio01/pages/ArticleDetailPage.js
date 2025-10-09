// src/pages/ArticleDetailPage.js
import { useParams, Link, Outlet } from 'react-router-dom';
import { articles } from '../data/articles';

const ArticleDetailPage = () => {
  // Requisito 4: Usar useParams para obtener el :id
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return <h1>Artículo no encontrado 😞</h1>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p><em>Por: {article.author.name}</em></p>
      <div style={{ padding: '10px', borderLeft: '3px solid #007bff', margin: '20px 0' }}>
        <p>{article.content}</p>
      </div>

      {/* Requisito 5: Link para navegar a la ruta anidada */}
      <Link to="autor" style={{ marginRight: '15px', textDecoration: 'none', color: 'green' }}>
        Sobre el Autor
      </Link>
      <Link to="" style={{ textDecoration: 'none', color: 'gray' }}>
        Ocultar Autor
      </Link>
      
      {/* Requisito 5: Outlet para renderizar la ruta hija (AuthorPage) */}
      <Outlet /> 

      <hr style={{ marginTop: '40px' }} />
      <Link to="/articulos">← Volver a la lista de artículos</Link>
    </div>
  );
};

export default ArticleDetailPage;