import React from 'react';
import './style.module.scss';

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  type?: string;
  onTextChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ name, placeholder, className, onTextChange, type }) => {
  return <input type={type} name={name} className={className} placeholder={placeholder} onChange={onTextChange} />;
};

export default Input;
