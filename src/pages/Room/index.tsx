import React, { useState, useEffect, useContext } from 'react';
import * as signalR from '@microsoft/signalr';
import { useLocation } from 'react-router-dom';
import { Typo } from '@scrpoker/components';
import { NameContext } from '../../';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://localhost:44397/room`)
  .build();

const Room: React.FC = () => {
  const userName = useContext(NameContext).username;
  const path = useLocation().pathname;
  const channel = `room-${path.substring(6, path.length)}`;
  const [messages, setMessages] = useState([] as string[]);
  const callBack = (data: string) => {
    setMessages([...messages, data]);
  };

  useEffect(() => {
    connection.on('send', callBack);
  }, [callBack]);

  useEffect(() => {
    connection.on('send', callBack);

    connection
      .start()
      .then(() => {
        connection.send('AddToGroup', channel, userName);
        console.log('connected');
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Typo>Room ID: {path.substring(6, path.length)}</Typo>
      <div>
        {messages.map((message, index) => (
          <Typo key={index}>{message}</Typo>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Room;
