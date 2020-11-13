import React from 'react';
import style from './style.module.scss';
import Icon from '../Icon';

interface Props {
  className?: string;
}

const AvatarInput: React.FC<Props> = ({ className }) => {
  const classes = `${style.container} ${className}`;
  return (
    <div className={classes}>
      <div className={style.circle}>
        <Icon name="user-circle" size="3x" />
      </div>
      <Icon className={style.camera} name="camera" size="sm" />
    </div>
  );
};

export default AvatarInput;
