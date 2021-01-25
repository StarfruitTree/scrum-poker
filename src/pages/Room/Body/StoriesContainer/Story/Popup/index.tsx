import React from 'react';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';

interface Props {
  isHidden: boolean;
  submittedPoint: ISubmittedPointByUsers[];
  className?: string;
}

const Popup: React.FC<Props> = ({ submittedPoint, isHidden, className }) => {
  return (
    <div className={`${style.popupAnimation} ${isHidden ? style.hiddenPopup : style.showPopup} ${className || ''}`}>
      <Typo>Submitted point by users</Typo>
      <div className={style.container}>
        {submittedPoint.map((s) => (
          <div key={s.userId} className={style.submittedPoint}>
            <Typo>{s.userName}</Typo>
            <Typo>{s.point}</Typo>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popup;
