import React from 'react';
import { Icon } from '@scrpoker/components';
import style from './style.module.scss';

interface Props {
  type: string;
  icon?: string;
  className?: string;
}

const Button: React.FC<Props> = ({ type, icon, children, className = '' }) => {
  const classes = `${style[type]} ${className}`;

  return (
    <button className={classes} type="button">
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </button>
  );
};

export default Button;
