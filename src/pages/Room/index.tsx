import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';
import * as signalR from '@microsoft/signalr';
const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://localhost:5001/room`)
  .build();

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

interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

const Room: React.FC = () => {
  const userContext = useContext(UserContext);
  userContext.roomConnection = connection;
  const currentStory: Story = {
    id: 4,
    title: 'Implement APIs',
    content: `In word processing and desktop publishing, a hard return or paragraph break indicates a new paragraph, to be distinguished from the soft return at the end of a line internal to a paragraph. This distinction allows word wrap to automatically re-flow text as it is edited, without losing paragraph breaks. The software may apply vertical white space or indenting at paragraph breaks, depending on the selected style.
    How such documents are actually stored depends on the file format. For example, HTML uses the <p> tag as a paragraph container. In plaintext files, there are two common formats. Pre-formatted text will have a newline at the end of every physical line, and two newlines at the end of a paragraph, creating a blank line. An alternative is to only put newlines at the end of each paragraph, and leave word wrapping up to the application that displays or processes the text.  
    A line break that is inserted manually, and preserved when re-flowing, may still be distinct from a paragraph break, although this is typically not done in prose. HTML's <br /> tag produces a line break without ending the paragraph; the W3C recommends using it only to separate lines of verse (where each "paragraph" is a stanza), or in a street address`,
    assignee: 'Hieu Le',
    point: 5,
  };

  const stories: Story[] = [
    {
      id: 1,
      title: 'Implement header component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 3,
    },
    {
      id: 2,
      title: 'Implement body component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 5,
    },
    {
      id: 3,
      title: 'Implement footer component',
      content: 'Must be responsive',
      assignee: 'An Pham',
      point: 5,
    },
    {
      id: 4,
      title: 'Implement APIs',
      content: `In word processing and desktop publishing, a hard return or paragraph break indicates a new paragraph, to be distinguished from the soft return at the end of a line internal to a paragraph. This distinction allows word wrap to automatically re-flow text as it is edited, without losing paragraph breaks. The software may apply vertical white space or indenting at paragraph breaks, depending on the selected style.
      How such documents are actually stored depends on the file format. For example, HTML uses the <p> tag as a paragraph container. In plaintext files, there are two common formats. Pre-formatted text will have a newline at the end of every physical line, and two newlines at the end of a paragraph, creating a blank line. An alternative is to only put newlines at the end of each paragraph, and leave word wrapping up to the application that displays or processes the text.     
      A line break that is inserted manually, and preserved when re-flowing, may still be distinct from a paragraph break, although this is typically not done in prose. HTML's <br /> tag produces a line break without ending the paragraph; the W3C recommends using it only to separate lines of verse (where each "paragraph" is a stanza), or in a street address`,
      assignee: 'Hieu Le',
      point: 5,
    },
  ];

  const {
    username,
    roomCode,
    roomName,
    description,
    action,
    roomState,
    userRole,
  } = useContext(UserContext);

  useEffect(() => {
    console.log(roomState);
    connection.start().then(() => {
      if (action == 'create') {
        connection
          .send(
            'create',
            roomCode,
            roomName,
            description,
            username,
            'standBy',
            0,
            roomState
          )
          .catch((err) => console.log(err));
      } else {
        connection
          .send('join', roomCode, username, 'standBy', 0, userRole)
          .catch((err) => console.log(err));
      }
    });
  }, []);

  return (
    <div className={style.pokingRoom}>
      <Header className={style.header} />
      <Body
        stories={stories}
        className={style.body}
        currentStory={currentStory}
      />
      <Footer />
    </div>
  );
};

export default Room;
