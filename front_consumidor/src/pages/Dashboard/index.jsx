/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { get } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';
import './styles.css';
import Carrinho from '../../components/Carrinho';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Subheader from '../../components/Subheader';
import InputSelect from '../../components/InputSelect';
import InputBusca from '../../components/InputBusca';
import IconVazio from '../../assets/vazio.svg';
import Cabecalho from '../../components/Cabecalho';
import Snackbar from '../../components/Snackbar';
import ModalEndereco from '../../components/ModalEndereco';
import useCart from '../../hooks/useCart';

export default function Dashboard() {
  const { token } = useAuth();
  const { limparCarrinho, cart } = useCart();

  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirCart, setAbrirCart] = useState(false);
  const [abrirEndereco, setAbrirEndereco] = useState(false);

  const [selecionado, setSelecionado] = useState(''); //guardará os dados do restaurante
  const [produto, setProduto] = useState('');
  const [itens, setItens] = useState('');

  async function buscarRestaurantes(busca, filtro) {
    try {
      const url = `restaurantes/?busca=${busca}&categoriaId=${filtro.id}`
      const resposta = await get(url, token)

      const lista = await resposta.json();

      setItens(lista);
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  useEffect(() => {
    buscarRestaurantes(busca, filtro)
  }, [busca, filtro])


  function retornar() {
    setFiltro('');
    setBusca('');
    setMensagem('');
    setOpenSnack(false);
    setAbrirModal(false);
    setAbrirCart(false);
    setAbrirEndereco(false);
    setSelecionado('')
    setProduto('');
    setItens('');
    buscarRestaurantes(busca);
    setMensagem('');
    setOpenSnack(false);
  }

  async function selecionarItem(item) {
    if (item.taxa_entrega) {
      setBusca('')
      let produtos = [];
      let idProdutos = [];
      setSelecionado(item);
      try {
        const resposta = await get(`restaurantes/${item.id}`, token)

        const lista = await resposta.json();

        lista.forEach(produto => {
          produto.ativo && produtos.push(produto)
          produto.ativo && idProdutos.push(produto.id)
        })

        if (cart.length > 0) {
          if (!idProdutos.find((id) => id === cart[0].produto_id)) {
            limparCarrinho();
          }
        }

      } catch (error) {
        setMensagem({ texto: error.message, status: 'erro' });
        setOpenSnack(true);
      }
      setItens(produtos)
      if (itens.length === 0) {
        setItens('')
      }
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
        setAbrirModal={setAbrirModal}
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
            <InputSelect
              placeholder="Selecione a categoria"
              value={filtro}
              setValue={setFiltro}
            />
          </form>
        )}
      </div>
      <div className={`container-produtos ${itens ?? 'ocultar'}`}>
        {itens && itens.map((item) =>
          <Card
            key={item.nome}
            item={item}
            onClick={selecionarItem}
          />
        )}
      </div>
      {itens.length < 1 && (
        <div className="container-vazio">
          <img src={IconVazio} alt='carrinho vazio'></img>
          <span>Desculpe, {selecionado ? 'estamos sem produtos ativos' : 'não há restaurantes ativos na sua região'}</span>
        </div>
      )}
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
