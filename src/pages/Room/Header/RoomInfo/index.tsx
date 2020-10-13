import React from 'react';
import { Typo, Icon } from '@scrpoker/components';
import style from './style.module.scss';

interface Data {
  roomName: string;
  description: string;
  roomCode: string;
  members: number;
}
interface Props {
  data: Data;
  className?: string;
}

const RoomInfo: React.FC<Props> = ({ data, className = '' }) => {
  const { roomName, description, roomCode, members } = data;
  return (
    <div className={`${style.roomInfo} ${className}`}>
      <Typo type="h1">{roomName}</Typo>
      <Typo>{description}</Typo>
      <hr className={style.dotted} />
      <Typo className={`${style.inline} ${style.light}`}>
        Room&apos;s code:{' '}
        <Typo type="b" className={style.inline}>
          {roomCode}
        </Typo>
        <Icon name="copy" size="fa-sm" />
      </Typo>
      <Typo className={`${style.inline} ${style.light}`}>
        &nbsp;- Members:{' '}
        <Typo type="b" className={style.inline}>
          {members}
        </Typo>
      </Typo>
    </div>
  );
};

export default RoomInfo;
