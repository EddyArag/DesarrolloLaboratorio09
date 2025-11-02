import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ConfirmacionRegistro = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`/api/usuario/${id}`);
        setUsuario(response.data);
      } catch (error) {
        setError('Error al cargar los datos del usuario');
      }
      setLoading(false);
    };

    if (id) {
      fetchUsuario();
    }
  }, [id]);

  if (loading) {
    return <div className="form-container">Cargando...</div>;
  }

  if (error) {
    return <div className="form-container"><div className="error">{error}</div></div>;
  }

  if (!usuario) {
    return <div className="form-container"><div className="error">Usuario no encontrado</div></div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="confirmation-page">
      <h2 className="form-title">Página de confirmación del registro de usuario</h2>
      
      <table className="confirmation-table">
        <tbody>
          <tr>
            <th>Nombre completo</th>
            <td>{usuario.nombre_completo}</td>
          </tr>
          <tr>
            <th>Dirección</th>
            <td>{usuario.direccion || 'No especificada'}</td>
          </tr>
          <tr>
            <th>Correo electrónico</th>
            <td>{usuario.correo_electronico}</td>
          </tr>
          <tr>
            <th>Contraseña</th>
            <td>●●●●●●●●</td>
          </tr>
          <tr>
            <th>Fecha de nacimiento</th>
            <td>{formatDate(usuario.fecha_nacimiento)}</td>
          </tr>
          <tr>
            <th>Sexo</th>
            <td>{usuario.sexo}</td>
          </tr>
          <tr>
            <th>Por favor, elije los temas de interés</th>
            <td>{usuario.temas_interes || 'Ninguno seleccionado'}</td>
          </tr>
          <tr>
            <th>Aficiones seleccionadas</th>
            <td>{usuario.aficiones_seleccionadas || 'Ninguna seleccionada'}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="button">
          Confirmar datos
        </button>
      </div>

      <div className="navigation" style={{ marginTop: '30px' }}>
        <Link to="/" className="nav-link">Nuevo Registro</Link>
        <Link to="/pasajes" className="nav-link">Comprar Pasajes</Link>
      </div>
    </div>
  );
};

export default ConfirmacionRegistro;
