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
  small?: boolean;
  square?: boolean;
  pointerCursor?: boolean;
  lightFont?: boolean;
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
  small = false,
  square = false,
  lightFont = false,
  pointerCursor = true,
  onClick,
}) => {
  const widthClass = fullWidth ? style.fullWidth : '';
  const typeClass = secondary ? style.secondary : '';
  const classes = `${style.button} ${widthClass} ${typeClass} ${className}`;
  return linkTo ? (
    <Link to={linkTo} className={`${classes} ${small ? style.small : ''}`}>
      <Typo type="span">{children}</Typo>
      {icon && <Icon className={children ? style.marginedIcon : style.normalIcon} name={icon} />}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${classes} ${small ? style.small : ''} ${square ? style.square : ''} ${
        pointerCursor ? style.pointer : ''
      }`}
      type="button"
      disabled={disabled}
    >
      {children && <Typo type="span">{children}</Typo>}
      {icon && <Icon className={children ? style.marginedIcon : style.normalIcon} name={icon} size="lg" />}
    </button>
  );
};

export default Button;
