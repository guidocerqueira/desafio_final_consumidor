import React, { createContext } from 'react';
import useCartProvider from '../hooks/useCartProvider';

const CartContext = createContext();

export function CartProvider(props) {
  const cart = useCartProvider();
  const { children } = props;
  return (
    <CartContext.Provider value={cart}>{children}</CartContext.Provider>
  );
}

export default CartContext;
