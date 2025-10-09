import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos todos nuestros componentes
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* La ruta padre usa el Layout y anida las demás */}
        <Route path="/" element={<Layout />}>
          {/* La ruta 'index' es la página por defecto del padre */}
          <Route index element={<HomePage />} />

          {/* Rutas específicas */}
          <Route path="cursos" element={<CoursesPage />} />
          <Route path="cursos/:courseId" element={<CourseDetailPage />} />

          {/* La ruta '*' actúa como comodín para páginas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);