class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=React&format=json&origin=*')
      .then(result => result.json())
      .then(json => {
// Titulos
        const data = json.query && json.query.search ? json.query.search : [];
        this.setState({ data });
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }

  render() {
    return (
      <div>
        <h2>Resultados de Wikipedia para "React"</h2>
        <ul>
          {this.state.data.map((item, idx) => (
            <li key={idx}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}
