import React, { useState, forwardRef } from 'react';
import './styles.css';
import IconEyeOpen from '../../assets/eyeOpen.svg';
import IconEyeClosed from '../../assets/eyeClosed.svg';

const InputSenha = forwardRef((props, ref) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flex-column input-password">
      <label htmlFor="password">{props.label}</label>
      <input
        id="password"
        type={mostrarSenha ? 'text' : 'password'}
        label={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBLur={props.onBlur} 
        ref={ref}
      />
      <img
        src={mostrarSenha ? IconEyeOpen : IconEyeClosed}
        className="eye-password"
        onClick={() => setMostrarSenha(!mostrarSenha)}
        alt="olhos"
      />
    </div>
  );
})

export default InputSenha;
