import React from 'react';
import './style.module.scss';

interface Props {
  placeholder: string;
  className?: string;
}

const Input: React.FC<Props> = ({ placeholder, className = '' }) => {
  return <input className={className} placeholder={placeholder}></input>;
};

export default Input;
