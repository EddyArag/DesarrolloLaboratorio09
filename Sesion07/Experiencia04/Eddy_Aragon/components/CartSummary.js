import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { state, dispatch } = useCart(); // Usamos el hook para obtener el estado y dispatch

  return (
    <div style={{ border: '1px solid black', padding: '15px' }}>
      <h3>Resumen del Carrito</h3>
      <p><strong>Total de items:</strong> {state.items.length}</p>
      <hr />
      <ul>
        {state.items.map(item => (
          <li key={item.instanceId}>
            {item.name} - ${item.price}
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartSummary;