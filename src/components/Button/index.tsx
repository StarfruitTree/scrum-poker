import React from 'react';
import { Icon } from '@scrpoker/components';
import style from './style.module.scss';
interface Props {
  type: string;
  icon?: string;
  className?: string;
  onclick?: () => void;
}

const Button: React.FC<Props> = ({
  type,
  icon,
  children,
  className = '',
  onclick,
}) => {
  const classes = `${style[type]} ${className}`;

  return (
    <button onClick={onclick} className={classes} type="button">
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </button>
  );
};

export default Button;
