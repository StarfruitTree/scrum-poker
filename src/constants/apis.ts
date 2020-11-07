const getUrl = (path: string): string => `${HOST}/api/${path}`;
const getChannel = (path: string): string => `${HOST}/${path}`;

export const HOST = process.env.NODE_ENV === 'development' ? 'https://127.0.0.1:5001' : 'https://somewhere.com';
export const CREATE_ROOM = getUrl('rooms/create');
export const JOIN_ROOM = getUrl('rooms/join');
export const ROOM_CHANNEL = getChannel('room');
