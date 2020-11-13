import React from 'react';
import { Icon, Typo } from '@scrpoker/components';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  linkTo?: string;
  secondary?: boolean;
  fullWidth?: boolean;
  icon?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  icon,
  children,
  linkTo,
  className,
  fullWidth = false,
  disabled = false,
  secondary = false,
  onClick,
}) => {
  const widthClass = fullWidth ? style.fullWidth : '';
  const typeClass = secondary ? style.secondary : '';
  const classes = `${style.button} ${widthClass} ${typeClass} ${className}`;
  return linkTo ? (
    <Link to={linkTo} className={classes}>
      <Typo type="span">{children}</Typo>
      {icon && <Icon name={icon} />}
    </Link>
  ) : (
    <button onClick={onClick} className={classes} type="button" disabled={disabled}>
      <Typo type="span">{children}</Typo>
      {icon && <Icon name={icon} />}
    </button>
  );
};

export default Button;
