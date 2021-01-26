import React from 'react';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';

interface IPopupState {
  isHidden: boolean;
  leftedSpace?: number;
}

interface Props {
  popUpState: IPopupState;
  submittedPoint?: ISubmittedPointByUsers[];
  className?: string;
}

const Popup: React.FC<Props> = ({ submittedPoint, popUpState, className }) => {
  console.log(popUpState.leftedSpace);

  return submittedPoint ? (
    <div
      style={{ left: popUpState.leftedSpace }}
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
  ) : (
    <div></div>
  );
};

export default Popup;
