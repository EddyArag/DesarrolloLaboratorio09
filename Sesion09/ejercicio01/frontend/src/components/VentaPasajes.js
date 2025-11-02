import React, { useState } from 'react';
import axios from 'axios';

const VentaPasajes = () => {
  const [formData, setFormData] = useState({
    nombrePasajero: '',
    fechaNacimiento: '',
    destino: '',
    precioBase: ''
  });
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularPrecio = async () => {
    if (!formData.fechaNacimiento || !formData.precioBase) {
      setError('Por favor, ingrese la fecha de nacimiento y el precio base');
      return;
    }

    try {
      const response = await axios.post('/api/calcular-pasaje', {
        fechaNacimiento: formData.fechaNacimiento,
        precioBase: parseFloat(formData.precioBase)
      });
      
      setResultado(response.data);
      setError('');
    } catch (error) {
      setError('Error al calcular el precio');
    }
  };

  const comprarPasaje = async () => {
    if (!formData.nombrePasajero || !formData.fechaNacimiento || !formData.destino || !formData.precioBase) {
      setError('Por favor, complete todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/comprar-pasaje', {
        ...formData,
        precioBase: parseFloat(formData.precioBase)
      });
      
      if (response.data.success) {
        alert(`Pasaje comprado exitosamente!\nPrecio final: $${response.data.precioFinal.toFixed(2)}\nTipo: ${response.data.tipoPasajero}`);
        setFormData({
          nombrePasajero: '',
          fechaNacimiento: '',
          destino: '',
          precioBase: ''
        });
        setResultado(null);
      }
    } catch (error) {
      setError('Error al comprar el pasaje');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Venta de Pasajes Aéreos</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-row">
        <div className="form-group">
          <label>Nombre del Pasajero</label>
          <input
            type="text"
            name="nombrePasajero"
            value={formData.nombrePasajero}
            onChange={handleInputChange}
            placeholder="Nombre completo"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Destino</label>
          <input
            type="text"
            name="destino"
            value={formData.destino}
            onChange={handleInputChange}
            placeholder="Ciudad de destino"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio Base ($)</label>
          <input
            type="number"
            name="precioBase"
            value={formData.precioBase}
            onChange={handleInputChange}
            placeholder="Precio en dólares"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="form-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="button" onClick={calcularPrecio}>
          Calcular Precio
        </button>
        <button 
          type="button" 
          className="button" 
          onClick={comprarPasaje}
          disabled={loading}
        >
          {loading ? 'Comprando...' : 'Comprar Pasaje'}
        </button>
      </div>

      {resultado && (
        <div className="price-calculator">
          <h3>Información del Pasaje</h3>
          <div className="price-result">
            <p><strong>Edad del pasajero:</strong> {resultado.edad} años</p>
            <p><strong>Tipo de pasajero:</strong> {resultado.tipoPasajero}</p>
            <p><strong>Precio base:</strong> ${parseFloat(formData.precioBase).toFixed(2)}</p>
            <p><strong>Descuento aplicado:</strong> {resultado.descuento}%</p>
            <p><strong>Precio final:</strong> ${resultado.precioFinal.toFixed(2)}</p>
          </div>
          
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h4>Información de Precios:</h4>
            <ul>
              <li><strong>Adultos (18+ años):</strong> Precio completo</li>
              <li><strong>Menores (2-17 años):</strong> 75% del precio</li>
              <li><strong>Infantes (0-2 años):</strong> Gratis</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentaPasajes;
