import React from 'react';
import RoomInfo from './RoomInfo';
import style from './style.module.scss';
import UsersContainer from './UsersContainer';

const Header: React.FC = () => {
  interface User {
    name: string;
    status: string;
    point?: number;
  }

  const users: User[] = [
    { name: 'Phieu', status: 'standBy' },
    { name: 'An', status: 'standBy' },
    { name: 'Hoang', status: 'standBy' },
    { name: 'Tien', status: 'standBy' },
    { name: 'Phi', status: 'standBy' },
    { name: 'Son', status: 'standBy' },
    { name: 'Hieu', status: 'standBy' },
    { name: 'Thai', status: 'standBy' },
    { name: 'Hong', status: 'standBy' },
    { name: 'Phieu', status: 'standBy' },
    { name: 'Phieu', status: 'ready' },
    { name: 'Phieu', status: 'revealed', point: 2 },
  ];
  return (
    <div className={style.header}>
      <RoomInfo
        title="Tricentis Flood"
        description="Sprint #53 planning is here, so let's get the party started shall we? Yes..."
        roomCode="123456"
        members={12}
        className={style.roomInfo}
      />

      <UsersContainer users={users} />
    </div>
  );
};

export default Header;
