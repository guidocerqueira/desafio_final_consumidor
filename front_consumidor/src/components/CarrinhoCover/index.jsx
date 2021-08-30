import React from 'react';
import './styles.css';
import IconChecked from '../../assets/checked.svg';
import IconVazio from '../../assets/vazio.svg';


export default function CarrinhoCover({ conteudo, voltar }) {
    return (
        <div style={{ position: 'relative' }}>
            <div className='coverup'>
                <img src={conteudo === 'vazio' ? IconVazio : IconChecked} alt='' />
                <div className='cover-texto'>
                    {conteudo === 'vazio' ? (
                        'Sem itens no carrinho'
                    ) : (
                        <>
                            Pedido Confirmado!
                            <br />
                            Agora é só aguardar o seu pedido
                        </>
                    )}
                </div>
                {conteudo === 'confirmado' && (
                    <button
                        className='aceitar'
                        onClick={() => voltar()}>
                        Voltar para o cardápio
                    </button>
                )}
            </div>
        </div>
    )
}