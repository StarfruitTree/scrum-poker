import React from 'react';
import { connect } from 'react-redux';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';

interface Props {
  point: number;
  selectedPoint: number;
  isLocked: boolean;
  enable: boolean;
  className?: string;
  styles?: string;
  isSelected: boolean;
  updatePoint: (point: number) => IRoomAction;
}

const PlayingCard: React.FC<Props> = ({
  point,
  selectedPoint,
  updatePoint,
  isLocked,
  enable,
  className = '',
  isSelected,
}) => {
  return (
    <div
      className={`${style.playingCard} ${enable ? style.enable : style.disable} ${
        isSelected ? style.isSelected : ''
      } ${className} ${selectedPoint !== point && isLocked ? style.disable : ''}`}
      onClick={
        isLocked
          ? undefined
          : enable
          ? () => {
              updatePoint(point);
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

const mapStateToProps = ({ roomData: { point, isLocked } }: IGlobalState) => {
  return {
    selectedPoint: point,
    isLocked,
  };
};

const mapDispatchToProps = {
  updatePoint: Actions.roomActions.updatePoint,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayingCard);
