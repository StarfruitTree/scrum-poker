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
  roomId: string;
  roomName: string;
  description: string;
  members: number;
  className?: string;
  users: User[];
}

const Header: React.FC<Props> = ({
  roomId,
  roomName,
  description,
  members,
  users,
  className = '',
}) => {
  return (
    <div className={`${style.header} ${className}`}>
      <RoomInfo
        title={roomName}
        description={description}
        roomCode={roomId}
        members={members}
        className={style.roomInfo}
      />

      <UsersContainer users={users} />
    </div>
  );
};

export default Header;
