class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      job: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  submitForm() {
    if (this.state.name && this.state.job) {
      this.props.handleSubmit(this.state);
      this.setState({ name: '', job: '' });
    }
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="job"
          placeholder="Trabajo"
          value={this.state.job}
          onChange={this.handleChange}
        />
        <input
          type="button"
          value="Agregar"
          onClick={this.submitForm}
        />
      </form>
    );
  }
}
