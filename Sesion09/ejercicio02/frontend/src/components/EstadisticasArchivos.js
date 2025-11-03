import React from 'react';

const EstadisticasArchivos = ({ archivos, especialidades }) => {
  const getTotalArchivos = () => archivos.length;

  const getArchivosPorEspecialidad = () => {
    const stats = {};
    especialidades.forEach(especialidad => {
      stats[especialidad] = archivos.filter(archivo => archivo.especialidad === especialidad).length;
    });
    return stats;
  };

  const getTiposArchivos = () => {
    const tipos = {};
    archivos.forEach(archivo => {
      tipos[archivo.tipo] = (tipos[archivo.tipo] || 0) + 1;
    });
    return tipos;
  };

  const getTamañoTotal = () => {
    return archivos.reduce((total, archivo) => total + archivo.tamaño, 0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getArchivosRecientes = () => {
    return archivos
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, 5);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES');
  };

  const archivosPorEspecialidad = getArchivosPorEspecialidad();
  const tiposArchivos = getTiposArchivos();
  const archivosRecientes = getArchivosRecientes();

  return (
    <div>
      <h2>Estadisticas del Sistema</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{getTotalArchivos()}</div>
          <div className="stat-label">Total de Archivos</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{especialidades.length}</div>
          <div className="stat-label">Especialidades</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{Object.keys(tiposArchivos).length}</div>
          <div className="stat-label">Tipos de Archivos</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{formatFileSize(getTamañoTotal())}</div>
          <div className="stat-label">Espacio Utilizado</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        
        {/* Archivos por Especialidad */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
          <h3>Archivos por Especialidad</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {especialidades.map(especialidad => (
              <div key={especialidad} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <span style={{ fontWeight: '500' }}>{especialidad}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: `${Math.max((archivosPorEspecialidad[especialidad] / Math.max(...Object.values(archivosPorEspecialidad))) * 100, 5)}%`,
                    height: '8px',
                    backgroundColor: '#007bff',
                    borderRadius: '4px',
                    minWidth: '20px'
                  }}></div>
                  <span style={{ 
                    minWidth: '30px', 
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: '#007bff'
                  }}>
                    {archivosPorEspecialidad[especialidad]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Archivos */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
          <h3>Tipos de Archivos</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {Object.entries(tiposArchivos)
              .sort(([,a], [,b]) => b - a)
              .map(([tipo, cantidad]) => (
              <div key={tipo} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <span style={{ fontWeight: '500' }}>{tipo}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: `${Math.max((cantidad / Math.max(...Object.values(tiposArchivos))) * 100, 5)}%`,
                    height: '8px',
                    backgroundColor: '#28a745',
                    borderRadius: '4px',
                    minWidth: '20px'
                  }}></div>
                  <span style={{ 
                    minWidth: '30px', 
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: '#28a745'
                  }}>
                    {cantidad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Archivos Recientes */}
      {archivosRecientes.length > 0 && (
        <div style={{ 
          background: 'white', 
          padding: '25px', 
          borderRadius: '10px', 
          border: '1px solid #e0e0e0',
          marginTop: '30px'
        }}>
          <h3>Archivos Subidos Recientemente</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Archivo</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Especialidad</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Tipo</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Tamaño</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {archivosRecientes.map((archivo, index) => (
                  <tr key={archivo.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      {archivo.nombre.replace(/^\d+_/, '')}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        borderRadius: '12px', 
                        fontSize: '12px' 
                      }}>
                        {archivo.especialidad}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{archivo.tipo}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      {formatFileSize(archivo.tamaño)}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      {formatDate(archivo.fechaCreacion)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {archivos.length === 0 && (
        <div className="empty-state">
          <h3>No hay datos para mostrar</h3>
          <p>Sube algunos archivos para ver las estadisticas del sistema</p>
        </div>
      )}
    </div>
  );
};

export default EstadisticasArchivos;
