import React, { useState } from 'react';
import axios from 'axios';

const VisualizarArchivos = ({ archivos, especialidades, loading, onArchivoEliminado }) => {
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [contenidoArchivo, setContenidoArchivo] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  const archivosFiltrados = filtroEspecialidad 
    ? archivos.filter(archivo => archivo.especialidad === filtroEspecialidad)
    : archivos;

  const getFileIcon = (tipo) => {
    const iconClass = `file-icon ${tipo.toLowerCase()}`;
    const iconText = {
      'PDF': 'PDF',
      'Word': 'DOC',
      'Texto': 'TXT',
      'Imagen': 'IMG',
      'Video': 'VID',
      'JavaScript': 'JS',
      'HTML': 'HTML',
      'CSS': 'CSS',
      'Python': 'PY',
      'Java': 'JAVA',
      'SQL': 'SQL',
      'JSON': 'JSON',
      'XML': 'XML',
      'Otro': '?'
    };
    
    return (
      <div className={iconClass}>
        {iconText[tipo] || '?'}
      </div>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES');
  };

  const verContenido = async (archivo) => {
    setLoadingContent(true);
    setArchivoSeleccionado(archivo);
    
    try {
      const response = await axios.get(`/api/archivo/${archivo.especialidad}/${archivo.id}`);
      setContenidoArchivo(response.data);
    } catch (error) {
      console.error('Error al cargar contenido:', error);
      setContenidoArchivo({
        contenido: 'Error al cargar el contenido del archivo',
        puedeVisualizarse: false
      });
    }
    
    setLoadingContent(false);
  };

  const descargarArchivo = (archivo) => {
    const url = `/api/download/${archivo.especialidad}/${archivo.id}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = archivo.nombre;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const eliminarArchivo = async (archivo) => {
    if (window.confirm('¿Estas seguro de que quieres eliminar este archivo?')) {
      try {
        await axios.delete(`/api/archivo/${archivo.especialidad}/${archivo.id}`);
        onArchivoEliminado();
        
        // Si el archivo eliminado es el que se está visualizando, limpiar la vista
        if (archivoSeleccionado && archivoSeleccionado.id === archivo.id) {
          setArchivoSeleccionado(null);
          setContenidoArchivo(null);
        }
        
      } catch (error) {
        console.error('Error al eliminar archivo:', error);
        alert('Error al eliminar el archivo');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando archivos...</div>;
  }

  return (
    <div>
      <h2>Visualizar Archivos</h2>
      
      <div className="specialty-filter">
        <button 
          className={`filter-btn ${filtroEspecialidad === '' ? 'active' : ''}`}
          onClick={() => setFiltroEspecialidad('')}
        >
          Todas las Especialidades ({archivos.length})
        </button>
        {especialidades.map(especialidad => {
          const count = archivos.filter(a => a.especialidad === especialidad).length;
          return (
            <button 
              key={especialidad}
              className={`filter-btn ${filtroEspecialidad === especialidad ? 'active' : ''}`}
              onClick={() => setFiltroEspecialidad(especialidad)}
            >
              {especialidad} ({count})
            </button>
          );
        })}
      </div>

      {archivosFiltrados.length === 0 ? (
        <div className="empty-state">
          <h3>No hay archivos</h3>
          <p>
            {filtroEspecialidad 
              ? `No hay archivos en la especialidad "${filtroEspecialidad}"`
              : 'Aún no se han subido archivos'
            }
          </p>
        </div>
      ) : (
        <div className="files-grid">
          {archivosFiltrados.map(archivo => (
            <div key={archivo.id} className="file-card">
              <div className="file-header">
                {getFileIcon(archivo.tipo)}
                <div className="file-name">
                  {archivo.nombre.replace(/^\d+_/, '')}
                </div>
              </div>
              
              <div className="file-info">
                <div><strong>Especialidad:</strong> {archivo.especialidad}</div>
                <div><strong>Tamaño:</strong> {formatFileSize(archivo.tamaño)}</div>
                <div><strong>Tipo:</strong> {archivo.tipo}</div>
                <div><strong>Subido:</strong> {formatDate(archivo.fechaCreacion)}</div>
              </div>
              
              <div className="file-actions">
                <button 
                  className="btn btn-small"
                  onClick={() => verContenido(archivo)}
                >
                  Ver Contenido
                </button>
                <button 
                  className="btn btn-secondary btn-small"
                  onClick={() => descargarArchivo(archivo)}
                >
                  Descargar
                </button>
                <button 
                  className="btn btn-danger btn-small"
                  onClick={() => eliminarArchivo(archivo)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {archivoSeleccionado && (
        <div className="file-viewer">
          <h3>Contenido del archivo: {archivoSeleccionado.nombre.replace(/^\d+_/, '')}</h3>
          
          {loadingContent ? (
            <div className="loading">Cargando contenido...</div>
          ) : contenidoArchivo ? (
            <div>
              <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Información del archivo:</strong><br />
                Especialidad: {contenidoArchivo.especialidad}<br />
                Tamaño: {formatFileSize(contenidoArchivo.tamaño)}<br />
                Tipo: {contenidoArchivo.tipo}<br />
                Extensión: {contenidoArchivo.extension}
              </div>
              
              {contenidoArchivo.puedeVisualizarse ? (
                <div className="file-content">
                  {contenidoArchivo.contenido}
                </div>
              ) : (
                <div className="alert alert-info">
                  Este tipo de archivo no se puede visualizar como texto. 
                  Puedes descargarlo para abrirlo con la aplicación apropiada.
                </div>
              )}
            </div>
          ) : null}
          
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setArchivoSeleccionado(null);
              setContenidoArchivo(null);
            }}
            style={{ marginTop: '15px' }}
          >
            Cerrar Visor
          </button>
        </div>
      )}
    </div>
  );
};

export default VisualizarArchivos;
