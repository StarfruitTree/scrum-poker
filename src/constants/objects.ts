export const reactModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    padding: '24px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export const initialRoomData: IRoomData = {
  roomId: 0,
  roomCode: '',
  roomName: '',
  roomState: '',
  description: '',
  roomConnection: {},
  users: [],
  submittedUsers: 0,
  point: -1,
  isLocked: false,
  role: 0,
  currentStory: undefined,
  currentStoryPoint: -1,
};
