// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos todos los componentes
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AuthorPage from './pages/AuthorPage'; // Componente de la ruta anidada
import NotFoundPage from './pages/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Requisito 1: La ruta padre usa el Layout y anida las demás */}
      <Route path="/" element={<Layout />}>
        {/* Requisito 2: Página de Inicio como ruta por defecto */}
        <Route index element={<HomePage />} /> 
        
        {/* Requisito 3: Ruta para la lista de artículos */}
        <Route path="articulos" element={<ArticlesPage />} />
        
        {/* Requisito 4 y 5: Ruta de detalle de artículo con parámetro dinámico y anidamiento */}
        <Route path="articulos/:id" element={<ArticleDetailPage />}>
          {/* Requisito 5: Ruta anidada para el autor. La URL será /articulos/:id/autor */}
          <Route path="autor" element={<AuthorPage />} />
          <Route index element={null} /> {/* Ruta por defecto de la ruta anidada (vacía) */}
        </Route>
        
        {/* Requisito 7: La ruta * actúa como comodín para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
