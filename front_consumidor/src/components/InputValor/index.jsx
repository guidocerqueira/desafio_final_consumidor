import React, { forwardRef } from 'react';
import './styles.css';

const InputValor = forwardRef((props, ref) => {
  return (
    <div className="flex-column input-value">
      <label htmlFor="value">{props.label}</label>
      <input
        id="value"
        label={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBLur={props.onBlur} 
        ref={ref}
      />
      <div className="cifrao">
        <span>R$</span>
      </div>
    </div>
  );
})

export default InputValor;
