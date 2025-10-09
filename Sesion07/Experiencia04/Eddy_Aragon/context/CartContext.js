import { createContext, useReducer, useContext } from 'react';

// Estado inicial del carrito
const initialState = {
  items: [],
};

// El reducer calcula el siguiente estado basado en la acción
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
};

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el Proveedor
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = { state, dispatch };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 3. Crear el Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};