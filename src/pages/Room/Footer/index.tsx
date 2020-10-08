import React from 'react';
import CardsContainer from './CardsContainer';
import style from './style.module.scss';

interface PlayingCards {
  point: number;
  enable: boolean;
}

const Footer: React.FC = () => {
  const cardsInfo: PlayingCards[] = [
    { point: 0, enable: true },
    { point: 1, enable: true },
    { point: 2, enable: true },
    { point: 3, enable: true },
    { point: 5, enable: true },
    { point: 8, enable: true },
    { point: 13, enable: true },
    { point: 21, enable: true },
  ];

  return (
    <div className={style.footer}>
      <CardsContainer playingCards={cardsInfo} />
    </div>
  );
};

export default Footer;
