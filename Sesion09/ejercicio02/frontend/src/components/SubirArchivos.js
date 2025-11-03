import React, { useState } from 'react';
import axios from 'axios';

const SubirArchivos = ({ especialidades, onArchivoSubido }) => {
  const [formData, setFormData] = useState({
    especialidad: '',
    archivo: null
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      archivo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.especialidad || !formData.archivo) {
      setMessage('Por favor, selecciona una especialidad y un archivo');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setMessage('');

    const uploadData = new FormData();
    uploadData.append('archivo', formData.archivo);
    uploadData.append('especialidad', formData.especialidad);

    try {
      await axios.post('/api/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Archivo subido exitosamente');
      setMessageType('success');
      setFormData({ especialidad: '', archivo: null });
      
      // Reset file input
      const fileInput = document.getElementById('archivo');
      if (fileInput) {
        fileInput.value = '';
      }

      onArchivoSubido();

    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al subir el archivo');
      setMessageType('error');
    }

    setUploading(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <h2>Subir Archivo</h2>
      
      {message && (
        <div className={`alert alert-${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="especialidad">Especialidad de la Carrera:</label>
          <select
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map(especialidad => (
              <option key={especialidad} value={especialidad}>
                {especialidad}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="archivo">Archivo:</label>
          <input
            type="file"
            id="archivo"
            name="archivo"
            onChange={handleFileChange}
            className="form-file"
            required
          />
          {formData.archivo && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <strong>Archivo seleccionado:</strong><br />
              <span>Nombre: {formData.archivo.name}</span><br />
              <span>Tamaño: {formatFileSize(formData.archivo.size)}</span><br />
              <span>Tipo: {formData.archivo.type || 'Desconocido'}</span>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-success"
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Subir Archivo'}
        </button>
      </form>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h4>Información sobre la subida de archivos:</h4>
        <ul>
          <li>Tamaño máximo por archivo: 10 MB</li>
          <li>Tipos de archivo soportados: Todos</li>
          <li>Los archivos se organizan automáticamente por especialidad</li>
          <li>Puedes visualizar el contenido de archivos de texto</li>
        </ul>
      </div>
    </div>
  );
};

export default SubirArchivos;
