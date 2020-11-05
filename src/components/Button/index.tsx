import React from 'react';
import { Icon, Typo } from '@scrpoker/components';
import style from './style.module.scss';

interface Props {
  type: string;
  icon?: string;
  className?: string;
  onclick?: () => void;
  disabled: boolean;
}

const Button: React.FC<Props> = ({
  type,
  icon,
  children,
  className = '',
  onclick,
  disabled,
}) => {
  return (
    <button
      onClick={onclick}
      className={
        disabled
          ? `${style.disabled} ${className}`
          : `${style[type]} ${className}`
      }
      type="button"
      disabled={disabled}
    >
      <Typo type="span">{children}</Typo>
      {icon && <Icon name={icon} />}
    </button>
  );
};

export default Button;
