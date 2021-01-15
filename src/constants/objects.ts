export const reactModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    padding: '20px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export const initialRoomData: IRoomData = {
  roomId: undefined,
  roomCode: '',
  roomName: '',
  roomState: '',
  description: '',
  roomConnection: {},
  users: [],
  submittedUsers: 0,
  point: -1,
  isLocked: false,
  role: undefined,
  currentStory: undefined,
  currentStoryPoint: -1,
};

export const initialUserData: IUserData = {
  jwtToken: '',
  userId: 0,
  name: '',
  action: -1,
  userRoomCode: '',
  email: '',
  jiraToken: '',
  jiraDomain: '',
};
