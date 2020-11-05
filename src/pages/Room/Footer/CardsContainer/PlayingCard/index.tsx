import React, { useContext } from 'react';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';

interface Props {
  point: number;
  enable: boolean;
  className?: string;
  styles?: string;
  isSelected: boolean;
}

const PlayingCard: React.FC<Props> = ({
  point,
  enable,
  className = '',
  isSelected,
}) => {
  const userContext = useContext(UserContext);

  return (
    <div
      className={`${style.playingCard} ${
        enable ? style.enable : style.disable
      } ${isSelected ? style.isSelected : ''} ${className}`}
      onClick={
        enable
          ? () => {
              userContext.setGlobalState({ ...userContext, point });
            }
          : undefined
      }
    >
      <Typo className={style.smallPointTopLeft}>{point}</Typo>
      <Typo className={style.smallPointBottomRight}>{point}</Typo>
      <Typo>{point}</Typo>
    </div>
  );
};

export default PlayingCard;
