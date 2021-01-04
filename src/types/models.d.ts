interface ISignUpData {
  email?: string;
  userName: string;
  password?: string;
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
  point: number;
}

interface IRoomData {
  roomId: number | undefined;
  roomCode: string;
  roomName: string;
  roomState: string;
  description: string;
  roomConnection: any;
  users: IUser[];
  submittedUsers: number;
  point: number;
  isLocked: boolean;
  role: number | undefined;
  currentStory: IStory | undefined;
  currentStoryPoint: number;
}

interface IRoomInfoPayload {
  roomId: number;
  roomCode: string;
  roomName: string;
  description: string;
  role: number;
}

interface IUserData {
  jwtToken: string;
  userId: number;
  name: string;
  action: number;
  userRoomCode: string | undefined;
  email: string | undefined;
}

interface IUserInfoPayload {
  userId: number;
  name: string;
  userRoomCode: string | undefined;
  email: string | undefined;
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

interface IResetRoom {
  roomState: string;
  users: IUser[];
  submittedUsers: number;
  point: number;
  currentStoryPoint: number;
  isLocked: boolean;
}

interface IUsersAndRoomStateAndCurrentStoryPoint {
  users: IUser[];
  roomState: string;
  currentStoryPoint: number;
}
