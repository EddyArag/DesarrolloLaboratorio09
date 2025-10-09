import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Libro de React Avanzado', price: 35 },
  { id: 2, name: 'Guía de Node.js y Express', price: 30 },
  { id: 3, name: 'Manual de SQL', price: 25 },
];

const ProductList = () => {
  const { dispatch } = useCart(); // Usamos el hook para obtener dispatch

  const handleAddToCart = (product) => {
    // Creamos un nuevo objeto para el carrito para evitar problemas de referencia
    const itemToAdd = { ...product, instanceId: Date.now() }; // ID único para cada instancia
    dispatch({ type: 'ADD_ITEM', payload: itemToAdd });
  };

  return (
    <div>
      <h3>Productos</h3>
      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '5px',
          }}
        >
          {product.name} - ${product.price}
          <button
            onClick={() => handleAddToCart(product)}
            style={{ marginLeft: '10px' }}
          >
            Añadir al Carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;