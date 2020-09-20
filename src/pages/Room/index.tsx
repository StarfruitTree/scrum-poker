import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useLocation } from 'react-router-dom';
import { Typo } from '@scrpoker/components';

const Room: React.FC = () => {
  const path = useLocation().pathname;
  const channel = `room-${path.substring(6, path.length)}`;
  const initialState: string[] = [];
  const [messagesState, setMessagesState] = useState({
    messages: initialState,
  });

  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`https://localhost:44397/room`)
    .build();

  connection.on('send', (data: string) => {
    console.log(data);
    const messages = messagesState.messages.slice();
    messages.push(data);
    setMessagesState({
      messages,
    });
  });

  async function start() {
    try {
      await connection.start();
      connection.send('AddToGroup', channel);
      console.log('connected');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <React.Fragment>
      <Typo>Room ID: {path.substring(6, path.length)}</Typo>
      <div>
        {messagesState.messages.map((message, index) => (
          <Typo key={index}>{message}</Typo>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Room;
