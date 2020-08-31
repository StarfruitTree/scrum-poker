import React from 'react';
import Style from './style.module.scss';

interface Props {
  buttonType: string;
  iconClassName: string;
}

const Button: React.FC<Props> = ({ buttonType, iconClassName, children }) => {
  return (
    <button className={Style[buttonType]} type="button">
      <span>{children}</span>
      {iconClassName === undefined ? null : (
        <i className={'fas fa-' + iconClassName} />
      )}
    </button>
  );
};

export default Button;
