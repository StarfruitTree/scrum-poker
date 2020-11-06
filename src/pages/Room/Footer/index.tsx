import React, { useContext } from 'react';
import CardsContainer from './CardsContainer';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';

interface PlayingCards {
  point: number;
  enable: boolean;
  isSelected: boolean;
}

const Footer: React.FC = () => {
  const { roomState, point } = useContext(UserContext);

  console.log(roomState);
  const enable =
    roomState === 'playing' || roomState === 'revealed' ? true : false;

  const cardsInfo: PlayingCards[] = [
    { point: 0, enable: enable, isSelected: 0 === point },
    { point: 1, enable: enable, isSelected: 1 === point },
    { point: 2, enable: enable, isSelected: 2 === point },
    { point: 3, enable: enable, isSelected: 3 === point },
    { point: 5, enable: enable, isSelected: 5 === point },
    { point: 8, enable: enable, isSelected: 8 === point },
    { point: 13, enable: enable, isSelected: 13 === point },
    { point: 21, enable: enable, isSelected: 21 === point },
  ];

  return (
    <div className={style.footer}>
      <CardsContainer playingCards={cardsInfo} />
    </div>
  );
};

export default Footer;
