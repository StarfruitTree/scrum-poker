const getUrl = (path: string): string => `${HOST}/api/${path}`;
const getChannel = (path: string): string => `${HOST}/${path}`;

export const HOST =
  process.env.NODE_ENV === 'development' ? 'https://localhost:5001' : 'https://scrumpokerserver.azurewebsites.net';
export const CREATE_ROOM = getUrl('rooms/create');
export const JOIN_ROOM = getUrl('rooms/join');
export const ROOM_CHANNEL = getChannel('room');
export const ADD_STORY = getUrl('stories/add');
export const GET_STORY = getUrl('stories/get');
export const SUBMIT_POINT = getUrl('stories/submitpoint');
export const GET_ROOM_STORIES: (roomId: number) => string = (roomId: number) => getUrl(`rooms/${roomId}/stories`);
export const SIGN_UP = getUrl('signup');
export const LOGIN = getUrl('login');
export const AUTHENTICATE = getUrl('authenticate');
export const REFRESH_TOKEN = getUrl('refreshtoken');
export const CHECK_ROOM: (roomCode: string) => string = (roomCode: string) => getUrl(`rooms/checkroom/${roomCode}`);
export const CHANGE_NAME = getUrl('changename');
export const SUBMIT_JIRA_USER_CREDENTIALS = getUrl('jira/addtoken');
export const FETCH_JIRA_STORIES = getUrl('jira/fetchstories');
export const ADD_JIRA_STORY = getUrl('jira/addstory');
