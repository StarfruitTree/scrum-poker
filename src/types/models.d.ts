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

interface IChangeNameData {
  newName: string;
}

interface IStory {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point: number;
  isJiraStory: boolean;
  jiraIssueId?: string;
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
  jiraIssueIds: string[];
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
  jiraToken?: string;
  jiraDomain?: string;
  userId: number;
  name: string;
  action: number;
  userRoomCode: string | undefined;
  email: string | undefined;
}

interface IUserInfoResponse {
  jwtToken: string;
  jiraToken?: string;
  jiraDomain?: string;
  userId: number;
  name: string;
  userRoomCode?: string;
  expiration: number;
  email?: string;
  isLoginFailed?: boolean;
}

interface IJiraUserCredentials {
  jiraEmail: string;
  jiraDomain: string;
  apiToken: string;
}

interface IUserInfoPayload {
  userId: number;
  name: string;
  userRoomCode: string | undefined;
  email: string | undefined;
  jiraToken?: string;
  jiraDomain?: string;
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

interface IJiraTokenPayload {
  jiraToken: string;
  jiraDomain: string;
}

interface ISubmittedPointByUsers {
  userId: number;
  userName: string;
  point: number;
}
