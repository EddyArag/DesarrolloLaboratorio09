import React, { Component } from 'react';

// Componente simple (función de flecha ES6)
// Contiene la lógica para dibujar el encabezado de la tabla.
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
// 3.c. Uso de Iteradores (MAP)
const TableBody = (props) => {
    // 3.c.1. Accede a la prop 'characterData'
    const rows = props.characterData.map((character, index) => {
        // 3.c.4. Asigna una clave única ('key')
        return (
            <tr key={index} className="hover:bg-gray-50 transition duration-150">
                
                {/* 3.c.3. Devuelve una fila (<tr>) que muestre los datos */}
                <td className="px-4 py-2 border-b">{character.name}</td>
                <td className="px-4 py-2 border-b">{character.job}</td>
                <td className="px-4 py-2 border-b">
                    {/* El botón Delete (Práctica 4) lo dejaremos vacío por ahora */}
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition duration-150 shadow-md"
                        // Aquí se conectará la función de la Práctica 4.b
                        onClick={() => console.log('Botón Delete presionado, esperando Práctica 4...')}
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

// 3.a.2. Componente de clase llamado 'Table'
class Table extends Component {
    render() {
        // 3.b.3. Accede a los datos usando 'this.props' y propaga al componente secundario 'TableBody'
        const { characterData } = this.props;

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    {/* 3.a.3. Importe y anide 'TableHeader' y 'TableBody' */}
                    <TableHeader />
                    <TableBody characterData={characterData} />
                </table>
            </div>
        );
    }
}

export default Table;
