// src/pages/AuthorPage.js
import { useParams } from 'react-router-dom';
import { articles } from '../data/articles';

const AuthorPage = () => {
  // Obtenemos el ID del artículo de la ruta padre
  const { id } = useParams(); 
  const article = articles.find(a => a.id === id);

  if (!article) {
    return <h3>Autor no encontrado para este artículo.</h3>;
  }

  return (
    <div style={{ border: '1px dashed #ccc', padding: '15px', marginTop: '20px' }}>
      <h4>Sobre el Autor: {article.author.name}</h4>
      <p>{article.author.bio}</p>
    </div>
  );
};

export default AuthorPage;