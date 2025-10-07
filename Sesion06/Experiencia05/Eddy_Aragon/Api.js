import React, { Component } from 'react';

// URL de prueba: una API simple de Wikipedia que devuelve artículos de ciencia
const API_URL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=science&format=json&origin=*';

// 5.a.1. Componente de clase con estado inicial de datos vacío
class Api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // Estado inicial vacío para los datos
            isLoading: true, // Indicador de carga
            error: null,
        };
    }

    // 5.a.2. Implementar el método de ciclo de vida 'componentDidMount()'
    // Este método se ejecuta *una sola vez* después de que el componente se monta en el DOM.
    componentDidMount() {
        console.log("ComponentDidMount: Iniciando extracción de datos (fetch)...");
        
        // 5.a.3. Utilizar la API nativa 'fetch'
        fetch(API_URL)
            // 5.a.4. Procesar la respuesta (result.json())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP! estado: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                const articles = result.query.search;
                
                // 5.a.4. Usar 'this.setState()' para almacenar los datos extraídos
                this.setState({
                    data: articles,
                    isLoading: false,
                });
                console.log("Datos cargados exitosamente.");
            })
            .catch(error => {
                console.error("Hubo un problema con la operación fetch:", error);
                this.setState({ error, isLoading: false });
            });
    }

    render() {
        const { data, isLoading, error } = this.state;

        if (error) {
            return (
                <div className="text-red-600 font-semibold p-4 border border-red-300 rounded-lg bg-red-50">
                    Error al cargar: {error.message}
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="text-indigo-600 font-semibold p-4">
                    Cargando datos de Wikipedia...
                </div>
            );
        }

        // 5.a.5. Renderizar los datos obtenidos en una lista (<ul>)
        const listItems = data.map((item) => (
            <li 
                key={item.pageid} 
                className="mb-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-indigo-50 transition duration-150 rounded-md"
            >
                <a 
                    href={`https://en.wikipedia.org/?curid=${item.pageid}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg font-bold text-indigo-700 hover:underline"
                >
                    {item.title}
                </a>
                <p className="text-gray-600 text-sm mt-1" dangerouslySetInnerHTML={{ __html: item.snippet }}></p>
            </li>
        ));

        return (
            <div className="bg-white p-6 rounded-lg shadow-xl mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">Artículos de Ciencia (API Fetch)</h2>
                <ul className="list-disc pl-5">
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default Api;
