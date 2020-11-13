import React from 'react';
import './style.module.scss';

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  onTextChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ name, placeholder, className, onTextChange }) => {
  return <input name={name} className={className} placeholder={placeholder} onChange={onTextChange} />;
};

export default Input;
