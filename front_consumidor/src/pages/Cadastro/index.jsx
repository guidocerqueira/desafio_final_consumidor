/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post } from '../../services/ApiClient';
import './styles.css';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import Snackbar from '../../components/Snackbar';

export default function Cadastro() {
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm();
  const history = useHistory();

  async function onSubmit(data) {
    if (data.senha !== data.senhaRepetida) {
      const msg = 'Senhas não são iguais';

      setMensagem({ texto: msg, status: 'erro' });
      setOpenSnack(true);
      return;
    }

    delete data.senhaRepetida;

    try {
      const resposta = await post('consumidor', data);

      if (!resposta.ok) {
        const msg = await resposta.json();

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        return;
      }

      history.push('/');
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  return (
    <div className="img-cadastro">
      <div className="base cadastro">
        <div className="title-box">
          <span className="titulo pagina">Cadastro</span>
        </div>
        <form
          className="formulario"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-um">
            <InputTexto
              label="Nome do usuário"
              {...register('nome')}
            />
            <InputTexto
              label="Email"
              {...register('email',
                {
                  minLength: { value: 3, message: 'Email inválido' },
                })}
            />
            <InputTexto
              label="Telefone"
              {...register('telefone',
                {
                  minLength: { value: 8, message: 'A senha deverá ter ao menos 8 caracteres' },
                })}
            />
            <InputSenha
              label="Senha"
              {...register('senha')}
            />
            <InputSenha
              label="Repita a senha"
              {...register('senhaRepetida')}
            />
          </div>
          <div className="button-box">
            <button
              className="aceitar"
              type="submit"
            >
              Criar conta
            </button>
          </div>
          <div className="link-box">
            <span>Já tem uma conta? </span>
            <NavLink to="/"> Login</NavLink>
          </div>
        </form>
      </div>
      <div className="ilustracao" />
      {mensagem && <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />}
    </div>
  );
}
