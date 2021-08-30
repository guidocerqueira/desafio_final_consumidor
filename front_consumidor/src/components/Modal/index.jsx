/* eslint-disable no-console */
import React, { useState } from 'react';
import './styles.css';
import IconFechar from '../../assets/x.svg';
import IconCart from '../../assets/carrinho.svg';
import IconCifrao from '../../assets/cifrao-icon.svg'
import IconTempo from '../../assets/tempo-icon.svg'
import editarPreco from '../../functions/editarPreco';
import Snackbar from '../Snackbar';
import useCart from '../../hooks/useCart';

export default function Modal({ restaurante, produto, abrirModal, setAbrirModal, carrinho, setCarrinho, setAbrirCart }) {
  const { adicionarAoCarrinho } = useCart()
  
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  function adicionarCarrinho() {
      const item = {
        produto_id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade,
        url_imagem: produto.url_imagem
      }

      setCarrinho([item, ...carrinho]);
      adicionarAoCarrinho(item);
      setAdicionado(true);
  }

  function fecharModal() {
    setAdicionado(false);
    setAbrirModal(false);
    setQuantidade(1);
  }

  function irParaCarrinho() {
    setAdicionado(false);
    setAbrirModal(false);
    setAbrirCart(true);
  }

  return (
    <>
      {abrirModal && (
        <div className="modal">
          <div className="base n-produto">
            <img
              className="fechar"
              src={IconFechar}
              alt='fechar'
              onClick={() => fecharModal()} />
            <div className="img-produto-modal"
              style={{ backgroundImage: `url('${produto.url_imagem}')` }}
            />
            <div className="logo-modal-borda">
              <img className="logo-modal"
                src={restaurante.url_imagem}
                alt={restaurante.nome} />
            </div>
            <div className="detalhes-produto">

              {adicionado ? (
                <div className="pedido-adicionado">
                  <img src={IconCart} alt='carrinho' />
                  <span>Pedido adicionado!</span>
                </div>
              ) : (<>
                <div className="nome-produto">{produto.nome}</div>
                <div className="dados-restaurante">
                  <img src={IconCifrao} alt="$" />
                  <b>Pedido Mínimo:</b> {restaurante && editarPreco(restaurante.valor_minimo_pedido, true)}
                  <img src={IconTempo} alt="relógio" />
                  <b>Tempo de Entrega:</b> {restaurante.tempo_entrega_minutos} min
                </div>
                <div className="dados-produto">
                  <div className="dados-coluna">
                    {produto.descricao}
                  </div>
                  <div className="dados-coluna">
                    <div className="preco-modal">
                      {produto && editarPreco(produto.preco, true)}
                    </div>
                  </div>
                </div>
                <div className="dados-carrinho">
                  <div className="quantidade-produto">
                    <button
                      className="modal-special minus"
                      disabled={quantidade === 1 && true}
                      onClick={() => setQuantidade(quantidade - 1)}
                    >
                      -
                    </button>
                    {quantidade}
                    <button className="modal-special plus"
                      onClick={() => setQuantidade(quantidade + 1)}>
                      +
                    </button>
                    <button
                      className="aceitar"
                      onClick={() => adicionarCarrinho()}
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                </div>
              </>)}
              <div className="link-revisao">
                <span onClick={() => irParaCarrinho()}>Ir para a revisão do pedido</span>
              </div>
            </div>
          </div>
          <Snackbar
            mensagem={mensagem}
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
          />
        </div>
      )}
    </>
  );
}
