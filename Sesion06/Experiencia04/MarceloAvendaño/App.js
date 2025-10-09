class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [
        { name: 'Charlie', job: 'Conserje' },
        { name: 'Mac', job: 'Chef' },
        { name: 'Dee', job: 'Actriz' },
        { name: 'Dennis', job: 'Bartender' }
      ]
    };
    this.removeCharacter = this.removeCharacter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  removeCharacter(index) {
    const { characters } = this.state;
    this.setState({
      characters: characters.filter((char, i) => i !== index)
    });
  }

  handleSubmit(character) {
    this.setState({
      characters: [...this.state.characters, character]
    });
  }

  render() {
    return (
      <div>
        <h1>Tabla de personajes</h1>
        <Table characterData={this.state.characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
