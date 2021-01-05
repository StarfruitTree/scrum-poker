import React from 'react';
import style from './style.module.scss';
import BoxContainer from './BoxContainer';

interface Props {
  className?: string;
}

const Body: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`${style.body} ${className}`}>
      <BoxContainer />
    </div>
  );
};

export default Body;
