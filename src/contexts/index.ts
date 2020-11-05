import React from 'react';

interface Props {
  username: string;
  userRole: number;
  roomCode: string;
  roomName: string;
  roomState: string;
  description: string;
  action: string;
  point: number;
  roomConnection: any;
  setGlobalState: any;
  selectedCard: number;
}

export const UserContext = React.createContext<Props>({
  username: '',
  userRole: 0,
  roomCode: '',
  roomName: '',
  roomState: '',
  description: '',
  action: '',
  point: -1,
  roomConnection: {},
  setGlobalState: {},
  selectedCard: -1,
});
