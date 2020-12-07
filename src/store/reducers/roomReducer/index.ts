const initialState: IRoomData = {
  roomId: 0,
  roomCode: '',
  roomName: '',
  roomState: '',
  description: '',
  roomConnection: {},
  users: [],
  submittedUsers: 0,
  canBeRevealed: false,
  point: -1,
  isLocked: false,
  role: 0,
};

const reducer = (state: IRoomData = initialState, action: IRoomAction): IRoomData => {
  switch (action.type) {
    case 'UPDATE_ROOM_INFO':
      return { ...state, ...(action.payload as IRoomInfoPayload) };
    case 'UPDATE_ROOM_CONNECTION':
      return { ...state, roomConnection: action.payload as string };
    case 'UPDATE_ROOM_STATE':
      return { ...state, roomState: action.payload as string };
    case 'UPDATE_USERS_AND_ROOM_STATE':
      return { ...state, ...(action.payload as IUsersAndRoomstate) };
    case 'UPDATE_USERS_AND_SUBMITTED_USERS':
      return { ...state, ...(action.payload as IUsersAndSubmittedUsers) };
    case 'UPDATE_USERS_AND_CAN_BE_REVEALED':
      return { ...state, ...(action.payload as IUsersAndCanBeRevealed) };
    case 'UPDATE_CAN_BE_REVEALED':
      return { ...state, canBeRevealed: action.payload as boolean };
    case 'UPDATE_POINT':
      return { ...state, point: action.payload as number };
    case 'RESET_ROOM':
      return { ...state, ...(action.payload as IResetRoom) };
    default:
      return state;
  }
};

export default reducer;
