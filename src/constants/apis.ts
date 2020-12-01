const getUrl = (path: string): string => `${HOST}/api/${path}`;
const getChannel = (path: string): string => `${HOST}/${path}`;

export const HOST = process.env.NODE_ENV === 'development' ? 'https://localhost:5001' : 'https://somewhere.com';
export const CREATE_ROOM = getUrl('rooms/create');
export const JOIN_ROOM = getUrl('rooms/join');
export const ROOM_CHANNEL = getChannel('room');
export const ADD_STORY = getUrl('stories/add');
export const GET_STORY = getUrl('stories/get');
export const GET_ROOM_STORIES: (roomId: number) => string = (roomId: number) => getUrl(`rooms/${roomId}/stories`);
export const SIGN_UP = getUrl('signup');
export const LOGIN = getUrl('login');
