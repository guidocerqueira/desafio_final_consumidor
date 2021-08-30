/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { get, post } from '../../services/ApiClient';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import IconFechar from '../../assets/x.svg';
import IconChecked from '../../assets/checked.svg';
import IconCart from '../../assets/carrinho.svg';
import Snackbar from '../Snackbar';

export default function Carrinho({ restaurante, abrirCart, setAbrirCart, setAbrirEndereco }) {
  const { token } = useAuth();
  const { cart } = useCart()
  const [enderecoAdicionado, setEnderecoAdicionado] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [subtotal, setSubtotal] = useState(0);


  function irParaEndereco() {
    setAbrirEndereco(true);
    setAbrirCart(false);
  }

  async function encontrarEndereco() {
    try {
      const resposta = await get('endereco', token);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        setEnderecoAdicionado(false);
        return;
      }

      const lista = await resposta.json();
      setEndereco(lista);
      setEnderecoAdicionado(true);
      setOpenSnack(false);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
      setEnderecoAdicionado(false);
    }
  }

  function calcularSubtotal() {
    let novoSubtotal = 0;

    for(const item of cart){
       novoSubtotal = (item.preco * item.quantidade) + novoSubtotal;
    }
    setSubtotal(novoSubtotal);
  }

  useEffect(() => {
    encontrarEndereco();
    calcularSubtotal();

  }, [abrirCart, cart])

  async function confirmarPedido() {
    const pedido = {
      restaurante_id: restaurante.id,
      cart
    }

    try {
      const resposta = await post('pedido', pedido, token);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        setPedidoConfirmado(false);
        return;
      }

      setPedidoConfirmado(true);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  function voltar() {
    setAbrirEndereco(false);
    setAbrirCart(false);
}

  return (
    <>
    {abrirCart && (
      <div className="modal">
        <div className="base n-produto padded">
          <img
            className="fechar"
            src={IconFechar}
            alt='fechar'
            onClick={() => setAbrirCart(false)} />
          <div className="cart-titulo">
            <img src={IconCart} alt='carrinho' />
            {restaurante.nome}
          </div>
          <div className="area-endereco">
            {enderecoAdicionado ? (
              <div>
                <span className="txt-end-entrega">Endereco de entrega:</span>
                <span className="text-endereco">{endereco.endereco}, {endereco.complemento}, {endereco.cep}</span>
              </div>
            ) : (
              <div onClick={() => irParaEndereco()}
                className="alerta-endereco">
                Adicionar endereço
              </div>
            )}
          </div>
          <div className="txt-tempo">
            Tempo de Entrega: {restaurante.tempo_entrega_minutos}min
          </div>
          <div className="cartbox">
            {cart.map((item) => (
              <div className="mini-card">
                <img src={item.url_imagem} alt={item.nome} />
                <div className="mini-detalhes">
                  <div className="mini-nome">{item.nome}</div>
                  <div className="mini-quantidade">{item.quantidade} unidade{item.quantidade > 1 && "s"}</div>
                  <div className="mini-preco">{item && editarPreco((item.preco*item.quantidade), true)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="fim-pedido">
            <div className="fim-subtotal">
              <div className="txt-fim">
                Subtotal
              </div>
              <div className="txt-resto">
                {restaurante && editarPreco(subtotal, true)}
              </div>
            </div>
            <div className="fim-taxa">
              <div className="txt-fim">
                Taxa de entrega
              </div>
              <div className="txt-resto">
                {restaurante && editarPreco(restaurante.taxa_entrega, true)}
              </div>
            </div>
            <div className="fim-total">
              <div className="txt-fim">
                Total
              </div>
              <div className="txt-total">
                {restaurante && editarPreco((restaurante.taxa_entrega + subtotal), true)}
              </div>
            </div>
            <button 
            onClick={() => confirmarPedido()}
            className="aceitar"
            disabled={subtotal < restaurante.valor_minimo_pedido}
            >
              {subtotal < restaurante.valor_minimo_pedido ? 'Pedido abaixo do valor mínimo!' : 'Confirmar pedido'}
            </button>
          </div>
        </div>
        <Snackbar
        />
      </div>
    )}
  </>
  );
}
