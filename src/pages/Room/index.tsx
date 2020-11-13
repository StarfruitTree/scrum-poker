import React, { useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';
import * as signalR from '@microsoft/signalr';
import { ROOM_CHANNEL } from '@scrpoker/constants/apis';

const connection = new signalR.HubConnectionBuilder().withUrl(ROOM_CHANNEL).build();

const Room: React.FC = () => {
  const userContext = useContext(UserContext);
  userContext.roomConnection = connection;

  const { userName, roomCode, roomState, userRole } = useContext(UserContext);

  useEffect(() => {
    console.log(roomState);
    connection.start().then(() => {
      connection.send('Combine', roomCode, userName, userRole).catch((err) => console.log(err));
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
