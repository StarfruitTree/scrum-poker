import React from 'react';
import style from './style.module.scss';

interface Props {
  isChecked: boolean;
  checkHandler: () => void;
}

const Checkbox: React.FC<Props> = ({ isChecked, checkHandler }) => {
  const isCheckedClass = isChecked
    ? `${style.checkBox} ${style.isChecked} fas fa-check-square fa-lg`
    : `${style.checkBox} far fa-square fa-lg`;

  return <i className={isCheckedClass} onClick={checkHandler}></i>;
};

export default Checkbox;
