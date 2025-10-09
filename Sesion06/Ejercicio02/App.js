function App() {
  const [rows, setRows] = React.useState([
    { id: 1, nombre: 'Alice', email: 'alice@example.com', comentario: 'Me gusta aprender sobre <b>seguridad</b>' },
  ]);
  const [search, setSearch] = React.useState('');
  const [showTips, setShowTips] = React.useState(true);

  function handleAdd(item) {
    setRows((r) => [item, ...r]);
  }
  function handleRemove(id) {
    setRows((r) => r.filter((x) => x.id !== id));
  }

  const filtered = rows.filter((r) =>
    [r.nombre, r.email, r.comentario].some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1>CysecUCSM</h1>
        <p>
          Esta app muestra conceptos básicos de estado, formularios, tablas y fetch. Incluye a propósito una
          vulnerabilidad.
        </p>
      </header>

      <section className="card">
        <Form onAdd={handleAdd} />
      </section>

      <section>
        <h2>Buscar</h2>
        <input
          placeholder="Buscar por nombre, email o comentario"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: 500 }}
        />
      </section>

      <section className="card table-wrap">
        <Table data={filtered} onRemove={handleRemove} />
      </section>

      <section className="card">
        <Api />
      </section>

      <section>
        <h2>Buenas prácticas rápidas</h2>
        <button onClick={() => setShowTips((s) => !s)}>{showTips ? 'Ocultar' : 'Mostrar'} tips</button>
        {showTips && (
          <ul>
            <li>Validar y sanitizar entradas del usuario.</li>
            <li>Usar cabeceras de seguridad (CSP, X-Frame-Options, etc.).</li>
            <li>Evitar renderizar HTML sin escapado.</li>
            <li>Principio de mínimo privilegio.</li>
          </ul>
        )}
      </section>

      <footer style={{ marginTop: 24 }}>
        <small>Demo educativa. No usar en producción tal cual.</small>
      </footer>
    </div>
  );
}
