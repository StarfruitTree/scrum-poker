import React from 'react';
import style from './style.module.scss';
import PlayingCard from './PlayingCard';

interface PlayingCards {
  point: number;
  enable: boolean;
  isSelected: boolean;
}

interface Props {
  playingCards: PlayingCards[];
}

const CardsContainer: React.FC<Props> = ({ playingCards }) => {
  return (
    <div className={style.cardsContainer}>
      {playingCards.map((card, index) => (
        <PlayingCard isSelected={card.isSelected} key={index} point={card.point} enable={card.enable} />
      ))}
    </div>
  );
};

export default CardsContainer;
