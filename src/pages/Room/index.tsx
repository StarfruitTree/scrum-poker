import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import style from './style.module.scss';
import * as signalR from '@microsoft/signalr';
import { ROOM_CHANNEL } from '@scrpoker/constants/apis';
import CookieReader from 'js-cookie';
import { Actions } from '@scrpoker/store';
import { initialRoomData } from '@scrpoker/constants/objects';

interface Props {
  roomCode: string;
  role?: number;
  updateRoomConnection: (roomConnection: any) => IRoomAction;
  cleanUpRoomData: (data: IRoomData) => IRoomAction;
}

const connection = new signalR.HubConnectionBuilder()
  .withUrl(ROOM_CHANNEL, { accessTokenFactory: () => CookieReader.get('jwtToken') as string })
  .build();

const Room: React.FC<Props> = ({ roomCode, role, updateRoomConnection, cleanUpRoomData }) => {
  updateRoomConnection(connection);

  useEffect(() => {
    if (roomCode) {
      connection.start().then(() => {
        connection.send('Combine', roomCode, role).catch((err) => console.log(err));
      });

      window.addEventListener('beforeunload', () => {
        connection.send('RemoveFromChannel', roomCode);
        connection.stop();
      });

      return () => {
        connection.send('RemoveFromChannel', roomCode);
        connection.stop();
        cleanUpRoomData(initialRoomData);
      };
    }
  }, [roomCode]);

  return (
    <div className={style.pokingRoom}>
      <Header className={style.header} />
      <Body className={style.body} />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ roomData: { roomCode, role } }: IGlobalState) => {
  return {
    roomCode: roomCode,
    role: role,
  };
};

const mapDispatchToProps = {
  updateRoomConnection: Actions.roomActions.updateRoomConnection,
  cleanUpRoomData: Actions.roomActions.cleanUpRoomData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
