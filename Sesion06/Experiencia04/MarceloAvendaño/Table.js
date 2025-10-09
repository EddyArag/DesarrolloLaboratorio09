const TableHeader = () => (
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Trabajo</th>
      <th>Acción</th>
    </tr>
  </thead>
);

const TableBody = (props) => (
  <tbody>
    {props.characterData.map((row, index) => (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
);

class Table extends React.Component {
  render() {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={this.props.characterData} removeCharacter={this.props.removeCharacter} />
      </table>
    );
  }
}
