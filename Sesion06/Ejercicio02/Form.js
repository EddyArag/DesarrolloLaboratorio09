function Form({ onAdd }) {
  const [form, setForm] = React.useState({ nombre: '', email: '', comentario: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.email) return;
    onAdd({ ...form, id: Date.now() });
    setForm({ nombre: '', email: '', comentario: '' });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 500 }}>
      <h2>Suscríbete al boletín</h2>
      <label>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email" />
      </label>
      <label>
        Comentario (para demo XSS)
        <textarea name="comentario" value={form.comentario} onChange={handleChange} placeholder="Escribe algo..." />
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
}

