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
  isLocked: boolean;
  submittedUsers: number;
  canBeRevealed: boolean;
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
  isLocked: false,
  submittedUsers: 0,
  canBeRevealed: false,
});
