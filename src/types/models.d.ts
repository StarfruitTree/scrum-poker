interface ISignUpData {
  email: string;
  userName: string;
  password: string;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IGlobalState {
  roomData: IRoomData;
  userData: IUserData;
}

interface IStory {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface IRoomData {
  roomId: number;
  roomCode: string;
  roomName: string;
  roomState: string;
  description: string;
  roomConnection: any;
  users: IUser[];
  submittedUsers: number;
  canBeRevealed: boolean;
  point: number;
  isLocked: boolean;
  role: number;
  currentStory: IStory | undefined;
}

interface IRoomInfoPayload {
  roomId: number;
  roomCode: string;
  roomName: string;
  description: string;
}

interface IUserData {
  jwtToken: string;
  userId: number;
  name: string;
  action: number;
  userRoomCode: string;
}

interface IUserInfoPayload {
  jwtToken: string;
  userId: number;
  userName: string;
  userRoomCode: string;
}
interface IUser {
  id: number;
  name: string;
  status: string;
  point?: number;
  role: number;
}

interface IUsersAndRoomstate {
  users: IUser[];
  roomState: string;
}

interface IUsersAndSubmittedUsers {
  users: IUser[];
  submittedUsers: number;
}

interface IUsersAndCanBeRevealed {
  users: IUser[];
  canBeRevealed: boolean;
}

interface IResetRoom {
  roomState: string;
  users: IUser[];
  submittedUsers: number;
  point: number;
  isLocked: boolean;
  canBeRevealed: boolean;
}
