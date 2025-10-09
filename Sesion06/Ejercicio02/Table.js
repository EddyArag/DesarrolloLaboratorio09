function Table({ data, onRemove }) {
  return (
    <div>
      <h2>Suscriptores</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 700 }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Comentario (render inseguro)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Sin registros</td></tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.nombre}</td>
                <td>{row.email}</td>
                <td>
                  <span dangerouslySetInnerHTML={{ __html: row.comentario }} />
                </td>
                <td>
                  <button onClick={() => onRemove(row.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
