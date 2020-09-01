import React from 'react';
import Style from './style.module.scss';

interface Props {
  buttonType: string;
  iconClassName?: string;
  className?: string;
}

const Button: React.FC<Props> = ({
  buttonType,
  iconClassName,
  children,
  className,
}) => {
  const classes =
    className === undefined
      ? Style[buttonType]
      : Style[buttonType] + ' ' + className;

  return (
    <button className={classes} type="button">
      <span>{children}</span>
      {iconClassName === undefined ? null : (
        <i className={'fas fa-' + iconClassName} />
      )}
    </button>
  );
};

export default Button;
