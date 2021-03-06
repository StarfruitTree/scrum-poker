import React from 'react';
import style from './style.module.scss';
import { Typo } from '@scrpoker/components';
interface Props {
  letter: string;
  pictureRef?: string;
  className?: string;
}

const Avatar: React.FC<Props> = ({ letter, pictureRef, className = '' }) => {
  const havePictureRef: boolean = pictureRef !== undefined;
  return (
    <div
      className={havePictureRef ? `${style.avatar} ${className}` : `${style.avatar} ${style.noPicture} ${className}`}
    >
      {havePictureRef ? <img src={pictureRef} className={style.picture} /> : <Typo>{letter}</Typo>}
    </div>
  );
};

export default Avatar;
