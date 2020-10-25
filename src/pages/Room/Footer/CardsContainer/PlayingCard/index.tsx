import React, { useContext } from 'react';
import { Typo } from '@scrpoker/components';
import style from './style.module.scss';
import { RoomContext } from '@scrpoker/pages/Room';
import { UserContext } from '@scrpoker/index';
interface Props {
  point: number;
  enable: boolean;
  className?: string;
  styles?: string;
}

const PlayingCard: React.FC<Props> = ({ point, enable, className = '' }) => {
  const { connection } = useContext(RoomContext);
  const { username, roomCode } = useContext(UserContext);

  async function Send() {
    connection.send('ChangeUserStatus', roomCode, username, 'revealed', point);
  }

  return (
    <div
      className={`${style.playingCard} ${
        enable ? style.enable : style.disable
      } ${className}`}
      onClick={() => {
        Send();
      }}
    >
      <Typo className={style.smallPointTopLeft}>{point}</Typo>
      <Typo className={style.smallPointBottomRight}>{point}</Typo>
      <Typo>{point}</Typo>
    </div>
  );
};

export default PlayingCard;
