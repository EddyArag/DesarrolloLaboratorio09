import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubirArchivos from './components/SubirArchivos';
import VisualizarArchivos from './components/VisualizarArchivos';
import EstadisticasArchivos from './components/EstadisticasArchivos';

function App() {
  const [activeTab, setActiveTab] = useState('subir');
  const [archivos, setArchivos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEspecialidades();
    cargarArchivos();
  }, []);

  const cargarEspecialidades = async () => {
    try {
      const response = await axios.get('/api/especialidades');
      setEspecialidades(response.data);
    } catch (error) {
      console.error('Error al cargar especialidades:', error);
    }
  };

  const cargarArchivos = async () => {
    try {
      const response = await axios.get('/api/archivos');
      setArchivos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar archivos:', error);
      setLoading(false);
    }
  };

  const onArchivoSubido = () => {
    cargarArchivos();
  };

  const onArchivoEliminado = () => {
    cargarArchivos();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Gestor de Archivos por Especialidad</h1>
        <p>Organiza y gestiona archivos de diferentes especialidades de la carrera</p>
      </div>

      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'subir' ? 'active' : ''}`}
          onClick={() => setActiveTab('subir')}
        >
          Subir Archivos
        </button>
        <button 
          className={`nav-tab ${activeTab === 'visualizar' ? 'active' : ''}`}
          onClick={() => setActiveTab('visualizar')}
        >
          Visualizar Archivos
        </button>
        <button 
          className={`nav-tab ${activeTab === 'estadisticas' ? 'active' : ''}`}
          onClick={() => setActiveTab('estadisticas')}
        >
          Estadisticas
        </button>
      </div>

      <div className="content-section">
        {activeTab === 'subir' && (
          <SubirArchivos 
            especialidades={especialidades}
            onArchivoSubido={onArchivoSubido}
          />
        )}
        
        {activeTab === 'visualizar' && (
          <VisualizarArchivos 
            archivos={archivos}
            especialidades={especialidades}
            loading={loading}
            onArchivoEliminado={onArchivoEliminado}
          />
        )}
        
        {activeTab === 'estadisticas' && (
          <EstadisticasArchivos 
            archivos={archivos}
            especialidades={especialidades}
          />
        )}
      </div>
    </div>
  );
}

export default App;
