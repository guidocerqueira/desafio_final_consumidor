import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { post } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';
import IllustrationLogin from '../../assets/illustration-comp.svg';
import InputSenha from '../../components/InputSenha';
import InputTexto from '../../components/InputTexto';
import Snackbar from '../../components/Snackbar';
import './styles.css';

export default function Login() {
  const [mensagem, setMensagem] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { logar } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const { email, senha } = formState.errors;
    if(email){
      setMensagem({ texto: email.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }

    if(senha){
      setMensagem({ texto: senha.message, status: 'erro' });
      setOpenSnack(true);
      return;
    }

  }, [formState])

  async function onSubmit(data) {
    try {
      const resposta = await post('login', data);

      if (!resposta.ok) {

        const msg = await resposta.json();
        console.log(msg)

        setMensagem({ texto: msg, status: 'erro' });
        setOpenSnack(true);
        return;
      }

      const { token } = await resposta.json();

      logar(token);

      history.push('/restaurantes');
    } catch (error) {
      setMensagem({ texto: error.message, status: 'erro' });
      setOpenSnack(true);
    }
  }

  return (
    <div className="img-login">
      <img className="ilustracao" src={IllustrationLogin} alt="" />
      <div className="base login">
        <div className="title-box">
          <span className="titulo pagina">Login</span>
          <div className="barril-logo" />
        </div>
        <form onSubmit ={handleSubmit(onSubmit)}>
          <InputTexto
            label="Email"
            {...register('email',
            { required: 'Email é um campo obrigatório',
            minLength: { value: 3, message: 'Email inválido'}, })}
          />
          <InputSenha
            label="Senha"
            {...register('senha',
            { required: 'Senha é um campo obrigatório',
            minLength: { value: 5, message: 'A senha deverá ter pelo menos cinco caracteres'}, })}
          />
          <div className="button-box">
            <button
              className="aceitar"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="link-box">
            <span>Ainda não tem uma conta? </span>
            <NavLink to="/cadastro"> Cadastre-se</NavLink>
          </div>
        </form>
      </div>
      <Snackbar
        mensagem={mensagem}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
      />
    </div>
  );
}
