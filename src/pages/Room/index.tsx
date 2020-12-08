import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import style from './style.module.scss';
import * as signalR from '@microsoft/signalr';
import { ROOM_CHANNEL } from '@scrpoker/constants/apis';
import CookieReader from 'js-cookie';
import { Actions, store } from '@scrpoker/store';

interface Props {
  roomCode: string;
  userRoomCode: string;
  role: number;
  userAction: number;
}

const connection = new signalR.HubConnectionBuilder()
  .withUrl(ROOM_CHANNEL, { accessTokenFactory: () => CookieReader.get('jwtToken') as string })
  .build();

store.dispatch(Actions.roomActions.updateRoomConnection({ roomConnection: connection }));

const Room: React.FC<Props> = ({ roomCode, userRoomCode, userAction, role }) => {
  useEffect(() => {
    connection.start().then(() => {
      connection.send('Combine', userAction === 0 ? userRoomCode : roomCode, role).catch((err) => console.log(err));
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

const mapStateToProps = ({ roomData: { roomCode, role }, userData: { action, userRoomCode } }: IGlobalState) => {
  return {
    roomCode: roomCode,
    role: role,
    userAction: action,
    userRoomCode,
  };
};

export default connect(mapStateToProps)(Room);
