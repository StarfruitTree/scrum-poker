const initialState: IRoomData = {
  roomId: 0,
  roomCode: '',
  roomName: '',
  roomState: '',
  description: '',
  roomConnection: {},
  submittedUsers: 0,
  canBeRevealed: false,
};

const reducer = (state: IRoomData = initialState, action: IRoomAction): IRoomData => {
  switch (action.type) {
    case 'UPDATE_ROOM_INFO':
      return { ...state, ...(action.payload as IRoomInfoPayload) };
    case 'UPDATE_ROOM_CONNECTION':
      return { ...state, ...(action.payload as IRoomConnectionPayload) };
    case 'UPDATE_SUBMITTED_USERS':
      return { ...state, ...(action.payload as ISubmmitedUsersPayload) };
    default:
      return state;
  }
};

export default reducer;
