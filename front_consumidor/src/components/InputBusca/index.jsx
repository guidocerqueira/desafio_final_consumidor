import React from 'react';
import './styles.css';

export default function InputBusca({
  placeholder, value, setValue
}) {
  return (
    <div className="flex-column input-search">
      <input
        id="text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
