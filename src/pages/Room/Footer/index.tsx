import React from 'react';
import CardsContainer from './CardsContainer';
import style from './style.module.scss';

interface PlayingCards {
  point: number;
  chosen: boolean;
}

const Footer: React.FC = () => {
  const cardsInfo: PlayingCards[] = [
    { point: 0, chosen: false },
    { point: 1, chosen: false },
    { point: 2, chosen: false },
    { point: 3, chosen: false },
    { point: 5, chosen: false },
    { point: 8, chosen: false },
    { point: 13, chosen: false },
    { point: 21, chosen: false },
  ];

  return (
    <div className={style.footer}>
      <CardsContainer playingCards={cardsInfo} />
    </div>
  );
};

export default Footer;
