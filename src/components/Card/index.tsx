import React from 'react';
import style from './style.module.scss';

interface Props {
  className?: string;
  row?: boolean;
  center?: boolean;
  width?: number;
  height?: number;
}

const Card: React.FC<Props> = ({ children, width, height, row = false, center = false, className }) => {
  const centerClass = center ? style.center : '';
  const directionClass = row ? style.row : style.column;
  const classes = `${style.container} ${directionClass} ${centerClass} ${className}`;
  return (
    <div className={classes} style={{ width, height }}>
      {children}
    </div>
  );
};

export default Card;
