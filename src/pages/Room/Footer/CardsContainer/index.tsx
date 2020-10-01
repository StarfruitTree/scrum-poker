import React from 'react';
import style from './style.module.scss';
import PlayingCard from './PlayingCard';

interface PlayingCards {
  point: number;
  chosen: boolean;
}

interface Props {
  playingCards: PlayingCards[];
}

const CardsContainer: React.FC<Props> = ({ playingCards }) => {
  return (
    <div className={style.cardsContainer}>
      {playingCards.map((card, index) => (
        <PlayingCard key={index} point={card.point} chosen={card.chosen} />
      ))}
    </div>
  );
};

export default CardsContainer;
