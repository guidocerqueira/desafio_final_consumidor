import React, { forwardRef } from 'react';
import './styles.css';

const InputTexto = forwardRef((props, ref) => {
  return (
    <div className="flex-column">
      <label htmlFor="text">{props.label}</label>
      <input
        id="text"
        label={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBLur={props.onBlur} 
        ref={ref}
      />

    </div>
  );
})

export default InputTexto;