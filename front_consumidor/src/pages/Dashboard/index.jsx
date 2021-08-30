/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { get, post } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';
import './styles.css';
import Carrinho from '../../components/Carrinho';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Subheader from '../../components/Subheader';
import InputBusca from '../../components/InputBusca';
import Cabecalho from '../../components/Cabecalho';
import Snackbar from '../../components/Snackbar';
import ModalEndereco from '../../components/ModalEndereco';
import useCart from '../../hooks/useCart';

export default function Dashboard() {
  const { token } = useAuth();
  const { limparCarrinho, cart } = useCart();

  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirCart, setAbrirCart] = useState(false);
  const [abrirEndereco, setAbrirEndereco] = useState(false);

  const [selecionado, setSelecionado] = useState(''); //guardará os dados do restaurante
  const [carrinho, setCarrinho] = useState([]);
  const [produto, setProduto] = useState('');
  const [itens, setItens] = useState('');

  async function buscarRestaurantes(busca) {
    try {
      const resposta = await get(`restaurantes/?busca=${busca}`, token)

      const lista = await resposta.json();

      setItens(lista);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  useEffect(() => {
    buscarRestaurantes(busca)
  }, [busca])


  function retornar() {
    setBusca('');
    setMensagem('');
    setOpenSnack(false);
    setAbrirModal(false);
    setAbrirCart(false);
    setAbrirEndereco(false);
    setSelecionado(''); //guardará os dados do restaurante
    setProduto('');
    setItens('');
    buscarRestaurantes(busca);
  }

  async function selecionarItem(item) {
    //se for restaurante(gambiarra)
    if (item.taxa_entrega) {
      setBusca('')
      let produtos = [];
      let idProdutos =[];
      setSelecionado(item);
      try {
        const resposta = await get(`restaurantes/${item.id}`, token)

        const lista = await resposta.json();

        lista.forEach(produto => {
          produto.ativo && produtos.push(produto)
          produto.ativo && idProdutos.push(produto.id)
        })

        if(cart.length > 0){
          if(!idProdutos.find((id)=> id === cart[0].produto_id)){
            limparCarrinho();
          }
        }

      } catch (error) {
        setMensagem({ texto: error.message, status: 'erro' });
        setOpenSnack(true);
      }
      setItens(produtos)
    }
    else if (item.preco) {
      setProduto(item);
      setAbrirModal(true);
    }
  }

  return (
    <div>
      <Modal
        restaurante={selecionado}
        produto={produto}
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        setAbrirCart={setAbrirCart}
      />
      <ModalEndereco
        abrirEndereco={abrirEndereco}
        setAbrirEndereco={setAbrirEndereco}
        setAbrirCart={setAbrirCart}
      />
      <Carrinho
        restaurante={selecionado}
        abrirCart={abrirCart}
        setAbrirCart={setAbrirCart}
        setAbrirEndereco={setAbrirEndereco}
      />
      <Cabecalho
        restaurante={selecionado}
      />
      <div className="sub-cabecalho">
        {selecionado ? (
          <Subheader
            setAbrirCart={setAbrirCart}
            selecionado={selecionado}
            retornar={retornar}
          />
        ) : (
          <form>
            <InputBusca
              value={busca}
              setValue={setBusca}
            />
          </form>
        )}
      </div>
      <div className="container-produtos">
        {itens && itens.map((item) =>
          <Card
            key={item.nome}
            item={item}
            onClick={selecionarItem}
          />
        )
        }
      </div>
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
