function Api() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      if (!res.ok) throw new Error('Error cargando datos');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <h2>Noticias recientes</h2>
      {loading && <p>Cargando…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {posts.map((p) => (
          <li key={p.id}><strong>{p.title}</strong><br />{p.body}</li>
        ))}
      </ul>
    </section>
  );
}
