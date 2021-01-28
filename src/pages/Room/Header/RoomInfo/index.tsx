import React from 'react';
import { useHistory } from 'react-router';
import { Typo, Icon, Button } from '@scrpoker/components';
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
  const history = useHistory();
  return (
    <div className={`${style.roomInfo} ${className}`}>
      <Typo type="h2">{roomName}</Typo>
      <Typo>{description}</Typo>
      <hr className={style.dotted} />
      <Typo className={`${style.inline} ${style.light}`}>
        Room&apos;s code:{' '}
        <Typo type="b" className={style.inline}>
          {roomCode}
        </Typo>
        <Icon name="copy" size="sm" />
      </Typo>
      <Typo className={`${style.inline} ${style.light}`}>
        &nbsp;- Members:{' '}
        <Typo type="b" className={style.inline}>
          {members}
        </Typo>
      </Typo>
      <Button
        className={style.leaveButton}
        onClick={() => {
          history.push('/home');
        }}
        icon="sign-out-alt"
      >
        Leave
      </Button>
    </div>
  );
};

export default RoomInfo;
