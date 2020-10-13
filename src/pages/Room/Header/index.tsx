import React from 'react';
import RoomInfo from './RoomInfo';
import style from './style.module.scss';
import UsersContainer from './UsersContainer';

interface User {
  name: string;
  status: string;
  point?: number;
}

interface Props {
  roomCode: string;
  roomName: string;
  description: string;
  members: number;
  className?: string;
  users: User[];
}

const Header: React.FC<Props> = ({
  roomCode,
  roomName,
  description,
  members,
  users,
  className = '',
}) => {
  const data = { roomCode, roomName, description, members };
  return (
    <div className={`${style.header} ${className}`}>
      <RoomInfo data={data} className={style.roomInfo} />

      <UsersContainer users={users} />
    </div>
  );
};

export default Header;
