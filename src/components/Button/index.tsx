import React from 'react';
import Style from './style.module.css';

interface Props {
  label: string;
  buttonType: string;
  iconClassName: string;
}

export default function Button({ label, buttonType, iconClassName }: Props) {
  return (
    <button className={Style[buttonType]} type="button">
      <span>{label}</span>
      {iconClassName === undefined ? null : (
        <i className={'fas fa-' + iconClassName} />
      )}
    </button>
  );
}
