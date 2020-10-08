import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import style from './style.module.scss';
import { UserContext } from '../../';
import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://localhost:44397/room`)
  .build();

interface User {
  name: string;
  status: string;
  point: number;
}

interface Room {
  users: User[];
  roomName: string;
  description: string;
}

export const RoomContext = React.createContext({ connection: connection });

const Room: React.FC = () => {
  const { username, roomId, roomName, description, action } = useContext(
    UserContext
  );

  const [users, setUsers] = useState([] as User[]);
  const [members, setMembers] = useState(0);
  const [roomInfo, setRoomInfo] = useState({ roomName: '', description: '' });

  const newUserConnectedCallback = async ({ name, status, point }: User) => {
    setUsers([...users, { name: name, status: status, point: point }]);
    setMembers(users.length + 1);
  };

  const firstTimeJoinCallback = async ({
    users,
    roomName,
    description,
  }: Room) => {
    setUsers([...users]);
    setMembers(users.length);
    setRoomInfo({ roomName: roomName, description: description });
  };

  const userStatusChangedCallback = async (user: User) => {
    console.log(user);
    const newUsers = users.map((u) => {
      if (u.name == user.name) {
        u.point = user.point;
        u.status = user.status;
      }

      return u;
    });

    setUsers(newUsers);
  };

  useEffect(() => {
    connection.off('newUserConnected');
    connection.on('newUserConnected', newUserConnectedCallback);
  }, [newUserConnectedCallback]);

  useEffect(() => {
    connection.off('userStatusChanged');
    connection.on('userStatusChanged', userStatusChangedCallback);
  }, [userStatusChangedCallback]);

  useEffect(() => {
    connection.on('firstTimeJoin', firstTimeJoinCallback);
  }, []);

  useEffect(() => {
    connection.start().then(() => {
      if (action == 'create') {
        connection
          .send('create', roomId, roomName, description, username, 'standBy', 0)
          .catch((err) => console.log(err));
      } else {
        connection
          .send('join', roomId, username, 'standBy', 0)
          .catch((err) => console.log(err));
      }
    });
  }, []);

  return (
    <RoomContext.Provider value={{ connection: connection }}>
      <div className={style.pokingRoom}>
        <Header
          roomId={roomId}
          roomName={roomInfo.roomName}
          description={roomInfo.description}
          members={members}
          users={users}
          className={style.header}
        />
        <Footer />
      </div>
    </RoomContext.Provider>
  );
};

export default Room;
