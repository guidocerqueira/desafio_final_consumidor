import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './styles.css';
import Avatar from '../../assets/avatar.png';
import Illustration from '../../assets/illustration-3.svg';
import HeadImagem from '../../assets/bg-pizzaria.png';
import BarriLogo from '../../assets/barril-logo.png';
import Snackbar from '../Snackbar';

export default function Cabecalho({ restaurante }) {
  const {
    nome, url_imagem: urlImagem, categoria,
  } = restaurante;
  const history = useHistory();
  const { token, deslogar } = useAuth();

  const [erro, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

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
      <img className="dash-barril-logo" src={BarriLogo} alt="" />
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
      <Snackbar
        erro={erro}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
