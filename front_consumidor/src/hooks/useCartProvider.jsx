import { useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useCartProvider() {
  const [cartPersistido, setCartPersistido, removeCartPersistido] = useLocalStorage('CARRINHO', []);
  const [cart, setCart] = useState(cartPersistido);

  const adicionarAoCarrinho = (novoProduto) => {
    let carrinho = cart.length > 0 ? [...cart] : []
    carrinho.push(novoProduto)
    setCart(carrinho);
    setCartPersistido(carrinho);
  };

  const limparCarrinho = () => {
    setCart([]);
    setCartPersistido([]);
    removeCartPersistido();
  };

  return {
    cart,
    adicionarAoCarrinho,
    limparCarrinho,
  };
}
