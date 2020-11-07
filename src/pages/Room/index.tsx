import React, { useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';
import * as signalR from '@microsoft/signalr';
import { ROOM_CHANNEL } from '@scrpoker/constants/apis';

const connection = new signalR.HubConnectionBuilder().withUrl(ROOM_CHANNEL).build();

interface User {
  name: string;
  status: string;
  point: number;
  role: number;
}

interface Room {
  users: User[];
  roomName: string;
  description: string;
  roomState: string;
}

const Room: React.FC = () => {
  const userContext = useContext(UserContext);
  userContext.roomConnection = connection;

  const { username, roomCode, roomName, description, action, roomState, userRole } = useContext(UserContext);

  useEffect(() => {
    console.log(roomState);
    connection.start().then(() => {
      if (action == 'create') {
        connection
          .send('create', roomCode, roomName, description, username, 'standBy', 0, roomState)
          .catch((err) => console.log(err));
      } else {
        connection.send('join', roomCode, username, 'standBy', 0, userRole).catch((err) => console.log(err));
      }
    });
  }, []);

  return (
    <div className={style.pokingRoom}>
      <Header className={style.header} />
      <Body className={style.body} />
      <Footer />
    </div>
  );
};

export default Room;
