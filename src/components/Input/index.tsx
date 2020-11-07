import React from 'react';
import './style.module.scss';

interface Props {
  placeholder?: string;
  className?: string;
  onTextChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholder, className, onTextChange }) => {
  return <input className={className} placeholder={placeholder} onChange={onTextChange} />;
};

export default Input;
