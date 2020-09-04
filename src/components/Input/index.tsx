import React from 'react';
import './style.module.scss';

interface Props {
  placeHolder: string;
  className?: string;
}

const Input: React.FC<Props> = ({ placeHolder, className = '' }) => {
  return <input className={className} placeholder={placeHolder}></input>;
};

export default Input;
