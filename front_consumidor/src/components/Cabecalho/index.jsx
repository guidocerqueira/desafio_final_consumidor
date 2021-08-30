import React from 'react';
import useAuth from '../../hooks/useAuth';
import './styles.css';
import Avatar from '../../assets/avatar.png';
import Illustration from '../../assets/illustration-3.svg';
import HeadImagem from '../../assets/bg-pizzaria.png';
import BarriLogo from '../../assets/barril-logo.png';

export default function Cabecalho({ restaurante }) {
  const {
    nome, url_imagem: urlImagem, categoria,
  } = restaurante;
  const { deslogar } = useAuth();

  function logout() {
    deslogar();
  }
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${categoria ? categoria.url_imagem : HeadImagem})` }}
        className="imagem-cabecalho"
      />

      <img className="dash-ilustracao" src={Illustration} alt="" />
      <div className="dash-barril-logo" >
        <img src={BarriLogo} alt="" />
      </div>
      <div className="avatar-borda">
        <img
          className="avatar"
          src={restaurante ? urlImagem : Avatar}
          alt="avatar"
        />
      </div>
      <div className="localizar-titulo">
        <span className="titulo sombreado">
          {restaurante ? nome : 'Restaurantes'}
        </span>
        <button
          className="botao-logout sombreado"
          type="button"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      )
    </div>
  );
}
