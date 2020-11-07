import React from 'react';
import { Icon, Typo } from '@scrpoker/components';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  linkTo?: string;
  secondary?: boolean;
  icon?: string;
  className?: string;
  disabled?: boolean;
  onclick?: () => void;
}

const Button: React.FC<Props> = ({
  icon,
  children,
  linkTo,
  disabled = false,
  secondary = false,
  className = '',
  onclick,
}) => {
  const typeClass = secondary ? style.secondary : '';
  const classes = `${style.button} ${typeClass} ${className}`;
  return linkTo ? (
    <Link to={linkTo} className={classes}>
      <Typo type="span">{children}</Typo>
      {icon && <Icon name={icon} />}
    </Link>
  ) : (
    <button onClick={onclick} className={classes} type="button" disabled={disabled}>
      <Typo type="span">{children}</Typo>
      {icon && <Icon name={icon} />}
    </button>
  );
};

export default Button;
