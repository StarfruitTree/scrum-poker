import React from 'react';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';

interface IPopupState {
  isHidden: boolean;
  left?: number;
  top?: number;
}

interface Props {
  popUpState: IPopupState;
  submittedPoint?: ISubmittedPointByUsers[];
  className?: string;
}

const Popup: React.FC<Props> = ({ submittedPoint, popUpState, className }) => {
  return submittedPoint && submittedPoint.length != 0 ? (
    <div
      style={{ left: popUpState.left, top: popUpState.top }}
      className={`${popUpState.isHidden ? style.hiddenPopup : style.showPopup} ${className || ''}`}
    >
      <Typo className={style.title}>Submitted point by users</Typo>
      <div className={style.container}>
        {submittedPoint.map((s) => (
          <div key={s.userId} className={style.submittedPoint}>
            <Typo className={style.userName}>{s.userName}</Typo>
            <Typo className={style.point}>{s.point}</Typo>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Popup;
