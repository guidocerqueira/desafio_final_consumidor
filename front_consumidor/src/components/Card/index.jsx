import React from 'react';
import './styles.css';
import editarPreco from '../../functions/editarPreco';

export default function Card({ item, onClick }) {
  const {
    nome, descricao, url_imagem: urlImagem, preco
  } = item;
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          className='card'
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
    </>
  );
}
