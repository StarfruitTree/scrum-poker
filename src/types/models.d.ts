interface IGlobalState {
  testReducer: boolean;
}

interface IRoomData {
  roomId: number;
  roomCode: string;
  roomName: string;
  roomState: string;
  description: string;
  roomConnection: any;
  submittedUsers: number;
  canBeRevealed: boolean;
}

interface IRoomInfoPayload {
  roomId: number;
  roomCode: string;
  roomName: string;
  roomState: string;
  description: string;
}

interface ISubmmitedUsersPayload {
  submittedUsers: number;
}

interface IRoomConnectionPayload {
  roomConnection: any;
}
