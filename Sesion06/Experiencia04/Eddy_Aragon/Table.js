import React, { Component } from 'react';

// Componente simple (función de flecha ES6)
const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th className="px-4 py-2 font-semibold text-left text-gray-700 bg-gray-200 border-b-2">Nombre</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-700 bg-gray-200 border-b-2">Trabajo</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-700 bg-gray-200 border-b-2">Acción</th>
            </tr>
        </thead>
    );
}

// Componente simple (función de flecha ES6)
// Recibe characterData Y la función removeCharacter
const TableBody = (props) => {
    // Desestructuramos las props para acceder a ambas
    const { characterData, removeCharacter } = props; 
    
    const rows = characterData.map((character, index) => {
        return (
            <tr key={index} className="hover:bg-gray-50 transition duration-150">
                <td className="px-4 py-2 border-b">{character.name}</td>
                <td className="px-4 py-2 border-b">{character.job}</td>
                <td className="px-4 py-2 border-b">
                    {/* 4.b.3. En 'onClick' llama a la función 'removeCharacter' pasándole el índice */}
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition duration-150 shadow-md"
                        onClick={() => removeCharacter(index)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

// Componente de clase llamado 'Table'
class Table extends Component {
    render() {
        // Desestructuramos characterData Y la función removeCharacter de this.props
        const { characterData, removeCharacter } = this.props;

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <TableHeader />
                    {/* 4.b.2. Propaga 'removeCharacter' hacia el componente secundario 'TableBody' */}
                    <TableBody 
                        characterData={characterData} 
                        removeCharacter={removeCharacter} 
                    />
                </table>
            </div>
        );
    }
}

export default Table;
