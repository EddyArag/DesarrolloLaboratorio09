import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos todos nuestros componentes de navegación
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Importamos componentes de autenticación
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal con Layout como contenedor */}
        <Route path="/" element={<Layout />}>
          {/* Página de inicio */}
          <Route index element={<HomePage />} />

          {/* Rutas de cursos */}
          <Route path="cursos" element={<CoursesPage />} />
          <Route path="cursos/:courseId" element={<CourseDetailPage />} />

          {/* Rutas de autenticación */}
          <Route path="login" element={<LoginPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Página para rutas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);