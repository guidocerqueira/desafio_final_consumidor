import React, { useState, useRef } from 'react';
import './styles.css';
import editarPreco from '../../functions/editarPreco';
import Snackbar from '../Snackbar';

export default function Card({ item, onClick }) {
  const {
    nome, descricao, url_imagem: urlImagem, preco
  } = item;
  const [editando, setEditando] = useState(false);
  
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          className={editando ? 'card blur' : 'card'}
          onClick={() => onClick(item)}
        >
          <div className="flex-column">
            <span className="card-titulo">{nome}</span>
            <span className="card-texto">{descricao}</span>
            <div className="card-preco">{preco ? editarPreco(preco, true) : "$$"}</div>
          </div>
          <div className="imagem-card">
            <img src={urlImagem} alt={nome} />
          </div>
        </div>
      </div>
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </>
  );
}
