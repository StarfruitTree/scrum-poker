import React, { useState, useEffect, useContext } from 'react';
import RoomInfo from './RoomInfo';
import style from './style.module.scss';
import UsersContainer from './UsersContainer';
import { UserContext } from '@scrpoker/contexts';

interface User {
  name: string;
  status: string;
  point?: number;
  role: number;
}

interface Data {
  users: User[];
  roomState: string;
}

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className = '' }) => {
  const [users, setUsers] = useState([] as User[]);
  const userContext = useContext(UserContext);
  const data = {
    roomCode: userContext.roomCode,
    roomName: userContext.roomName,
    description: userContext.description,
    members: users.length,
  };

  const firstTimeJoinCallback = async ({ users, roomState }: Data) => {
    setUsers([...users]);
    userContext.setGlobalState({ ...userContext, roomState });
  };

  const newUserConnectedCallback = async (user: User) => {
    setUsers([...users, user]);
    userContext.setGlobalState({ ...userContext, canBeRevealed: false });
  };

  const userStatusChangedCallback = async (user: User) => {
    const newUsers = users.map((u) => {
      if (u.name == user.name) {
        u.point = user.point;
        u.status = user.status;
      }
      return u;
    });

    userContext.submittedUsers++;
    setUsers(newUsers);
    if (userContext.submittedUsers === users.length) {
      userContext.setGlobalState({ ...userContext, canBeRevealed: true });
    }
  };

  const roomStateChangedCallback = async (data) => {
    if (data.roomState !== 'revealed') {
      userContext.setGlobalState({ ...userContext, roomState: data.roomState });
    } else {
      setUsers(data.users);
      userContext.setGlobalState({ ...userContext, roomState: data.roomState });
    }
  };

  useEffect(() => {
    userContext.roomConnection.on('firstTimeJoin', firstTimeJoinCallback);
  }, []);

  useEffect(() => {
    userContext.roomConnection.off('newUserConnected');
    userContext.roomConnection.on('newUserConnected', newUserConnectedCallback);
  }, [newUserConnectedCallback]);

  useEffect(() => {
    userContext.roomConnection.off('userStatusChanged');
    userContext.roomConnection.on(
      'userStatusChanged',
      userStatusChangedCallback
    );
  }, [userStatusChangedCallback]);

  useEffect(() => {
    userContext.roomConnection.off('roomStateChanged');
    userContext.roomConnection.on('roomStateChanged', roomStateChangedCallback);
  }, [roomStateChangedCallback]);

  return (
    <div className={`${style.header} ${className}`}>
      <RoomInfo data={data} className={style.roomInfo} />
      <UsersContainer users={users} />
    </div>
  );
};

export default Header;
