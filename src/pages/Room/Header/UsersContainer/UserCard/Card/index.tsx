import React from 'react';
import style from './style.module.scss';
import { Icon, Typo } from '@scrpoker/components';

interface Props {
  status: string;
  point?: number;
  className?: string;
}

const Card: React.FC<Props> = ({ status, point, className = '' }) => {
  return (
    <div
      className={`${style.card} ${
        status == 'revealed'
          ? style.revealed
          : status == 'standBy'
          ? style.standBy
          : style.ready
      } ${className}`}
    >
      {status == 'revealed' ? (
        <Typo type="h2">{point}</Typo>
      ) : status == 'standBy' ? (
        <Icon name="question" size="fa-lg" />
      ) : (
        <Icon name="check" size="fa-lg" />
      )}
    </div>
  );
};

export default Card;
