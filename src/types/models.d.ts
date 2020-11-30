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

interface IUserData {
  jwtToken: string;
  userId: number;
  userName: string;
  userRole: number;
  action: string;
  point: number;
  isCardLocked: boolean;
}

interface IUserInfoPayload {
  jwtToken: string;
  userId: number;
  userName: string;
}

interface IUserActionPayload {
  action: string;
}

interface IUserRolePayload {
  userRole: number;
}

interface IUserPointPayload {
  point: number;
}

interface IIsCardLockedPayload {
  isCardLocked: boolean;
}
