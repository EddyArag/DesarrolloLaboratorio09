import React, { useState } from 'react';
import axios from 'axios';

const MatrizPerfecta = () => {
  const [tamaño, setTamaño] = useState(3);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generarMatriz = async () => {
    if (tamaño < 2 || tamaño > 10) {
      setError('El tamaño debe estar entre 2 y 10');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/matriz-perfecta/${tamaño}`);
      setResultado(response.data);
    } catch (error) {
      setError('Error al generar la matriz');
    }
    
    setLoading(false);
  };

  const renderMatriz = (matriz) => {
    return (
      <div className="matrix">
        {matriz.map((fila, i) => (
          <div key={i} className="matrix-row">
            {fila.map((valor, j) => (
              <div key={j} className="matrix-cell">
                {valor}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Generador de Matriz Perfecta</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="form-row">
        <div className="form-group">
          <label>Tamaño de la Matriz (2-10)</label>
          <input
            type="number"
            value={tamaño}
            onChange={(e) => setTamaño(parseInt(e.target.value))}
            min="2"
            max="10"
          />
        </div>
      </div>

      <div className="form-row" style={{ justifyContent: 'center' }}>
        <button 
          type="button" 
          className="button" 
          onClick={generarMatriz}
          disabled={loading}
        >
          {loading ? 'Generando...' : 'Generar Matriz Aleatoria'}
        </button>
      </div>

      {resultado && (
        <div className="matrix-container">
          <h3>Matriz Generada ({tamaño}x{tamaño})</h3>
          
          <div style={{ textAlign: 'center' }}>
            {renderMatriz(resultado.matriz)}
          </div>

          <div className="price-result" style={{ marginTop: '20px' }}>
            <h4>¿Es una matriz perfecta? {resultado.esPerfecta ? 'SÍ' : 'NO'}</h4>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h4>Análisis de Sumas:</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <strong>Suma de Filas:</strong>
                <ul>
                  {resultado.sumaFilas.map((suma, i) => (
                    <li key={i}>Fila {i + 1}: {suma}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong>Suma de Columnas:</strong>
                <ul>
                  {resultado.sumaColumnas.map((suma, i) => (
                    <li key={i}>Columna {i + 1}: {suma}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong>Suma de Diagonales:</strong>
                <ul>
                  <li>Diagonal Principal: {resultado.sumaDiagonalPrincipal}</li>
                  <li>Diagonal Secundaria: {resultado.sumaDiagonalSecundaria}</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
            <h5>¿Qué es una matriz perfecta?</h5>
            <p>
              Una matriz es considerada "perfecta" cuando la suma de todos sus elementos en cada fila, 
              columna y diagonal (principal y secundaria) es exactamente la misma. 
              Es similar a un cuadrado mágico matemático.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrizPerfecta;
