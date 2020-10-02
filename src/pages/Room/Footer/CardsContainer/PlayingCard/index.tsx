import React from 'react';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';

interface Props {
  point: number;
  chosen: boolean;
  className?: string;
  styles?: string;
}

const PlayingCard: React.FC<Props> = ({ point, chosen, className = '' }) => {
  return (
    <div
      className={`${style.playingCard} ${
        chosen ? style.chosen : ''
      } ${className}`}
    >
      <Typo className={style.smallPointTopLeft}>{point}</Typo>
      <Typo className={style.smallPointBottomRight}>{point}</Typo>
      <Typo>{point}</Typo>
    </div>
  );
};

export default PlayingCard;
