import React from 'react';
import { Typo, Icon } from '@scrpoker/components';
import style from './style.module.scss';

interface Props {
  title: string;
  description: string;
  roomCode: string;
  members: number;
  className?: string;
}

const RoomInfo: React.FC<Props> = ({
  title,
  description,
  roomCode,
  members,
  className = '',
}) => {
  return (
    <div className={`${style.roomInfo} ${className}`}>
      <Typo type="h2">{title}</Typo>
      <Typo>{description}</Typo>
      <hr className={style.dotted} />
      <Typo type="span">
        Room&apos;s code:{' '}
        <Typo type="h4" className={style.inline}>
          {roomCode}
        </Typo>
        <Icon name="copy" size="fa-sm" /> - Members:{' '}
        <Typo type="h4" className={style.inline}>
          {members}
        </Typo>
      </Typo>
    </div>
  );
};

export default RoomInfo;
