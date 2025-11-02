import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    direccion: '',
    correoElectronico: '',
    contrasena: '',
    confirmarContrasena: '',
    fechaNacimiento: '',
    sexo: '',
    temasInteres: [],
    aficionesSeleccionadas: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const temasDisponibles = ['Ficción', 'Acción', 'Terror', 'Comedia', 'Suspense'];
  const aficionesDisponibles = ['Música-Pop', 'Fotografía', 'Deportes-auto-Juego'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (!formData.nombreCompleto || !formData.correoElectronico || !formData.contrasena || !formData.sexo) {
      setError('Por favor, complete todos los campos obligatorios');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/registro', formData);
      
      if (response.data.success) {
        navigate(`/confirmacion/${response.data.userId}`);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al registrar usuario');
    }
    
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Formulario de inscripción de usuarios</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Dirección</label>
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Universidad de Almería, Dpto. Lenguajes y Computación"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <select 
              style={{ width: '80px', marginRight: '10px' }}
              onChange={(e) => {
                const day = e.target.value;
                const currentDate = formData.fechaNacimiento;
                const parts = currentDate.split('-');
                const newDate = `${parts[0] || '1970'}-${parts[1] || '08'}-${day.padStart(2, '0')}`;
                setFormData(prev => ({ ...prev, fechaNacimiento: newDate }));
              }}
            >
              <option value="">Día</option>
              {Array.from({length: 31}, (_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
            
            <select 
              style={{ width: '100px', marginRight: '10px' }}
              onChange={(e) => {
                const month = e.target.value;
                const currentDate = formData.fechaNacimiento;
                const parts = currentDate.split('-');
                const newDate = `${parts[0] || '1970'}-${month.padStart(2, '0')}-${parts[2] || '01'}`;
                setFormData(prev => ({ ...prev, fechaNacimiento: newDate }));
              }}
            >
              <option value="">Mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
            
            <input
              type="number"
              placeholder="Año (yyyy)"
              style={{ width: '100px' }}
              min="1900"
              max="2025"
              onChange={(e) => {
                const year = e.target.value;
                const currentDate = formData.fechaNacimiento;
                const parts = currentDate.split('-');
                const newDate = `${year}-${parts[1] || '08'}-${parts[2] || '01'}`;
                setFormData(prev => ({ ...prev, fechaNacimiento: newDate }));
              }}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Sexo</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="sexo"
                  value="Hombre"
                  checked={formData.sexo === 'Hombre'}
                  onChange={handleInputChange}
                />
                <span>Hombre</span>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="sexo"
                  value="Mujer"
                  checked={formData.sexo === 'Mujer'}
                  onChange={handleInputChange}
                />
                <span>Mujer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Por favor, elije los temas de interés</label>
            <div className="checkbox-group">
              {temasDisponibles.map(tema => (
                <div key={tema} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={tema}
                    checked={formData.temasInteres.includes(tema)}
                    onChange={(e) => handleCheckboxChange(e, 'temasInteres')}
                  />
                  <span>{tema}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Selecciona tus aficiones</label>
            <div className="select-group">
              <select 
                multiple 
                className="select-multiple"
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData(prev => ({ ...prev, aficionesSeleccionadas: selectedOptions }));
                }}
              >
                {aficionesDisponibles.map(aficion => (
                  <option key={aficion} value={aficion}>{aficion}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row" style={{ justifyContent: 'center' }}>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Registrando...' : 'Confirmar datos'}
          </button>
          <button type="button" className="button button-secondary" onClick={() => window.location.reload()}>
            Borrar datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroUsuario;
