import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import style from './style.module.scss';
import { useLocation } from 'react-router-dom';
import { NameContext } from '../../';
import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://localhost:44397/room`)
  .build();

interface User {
  name: string;
  status: string;
  point: number;
}

const Room: React.FC = () => {
  const { username, roomName, description, action } = useContext(NameContext);

  const path = useLocation().pathname;

  const roomId = path.substring(6, path.length);

  const [users, setUsers] = useState([] as User[]);
  const [members, setMembers] = useState(0);
  const newUserConnectedCallback = (user: User) => {
    setUsers([...users, user]);
    let newMembers = members;
    newMembers++;
    setMembers(newMembers);
  };

  const firstTimeJoinCallback = (data: any) => {
    console.log(data[0]);
    setUsers([...users, data[0]]);
    let newMembers = members;
    newMembers++;
    setMembers(newMembers);
  };

  useEffect(() => {
    connection.on('newUserConnected', newUserConnectedCallback);
  }, [users]);

  useEffect(() => {
    connection.on('firstTimeJoin', firstTimeJoinCallback);
  });

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
    <div className={style.pokingRoom}>
      <Header
        roomId={roomId}
        roomName={roomName}
        description={description}
        members={members}
        users={users}
      />
      <Footer />
    </div>
  );
};

export default Room;
