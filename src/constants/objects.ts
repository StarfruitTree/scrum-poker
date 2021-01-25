export const reactModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '3px',
    padding: '1rem',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export const jiraStoryModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '3px',
    padding: '1rem',
    height: '41rem',
    width: '870px',
    overflow: 'hidden',
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
  jiraIssueIds: [],
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

export class GlobalRoomJiraDomain {
  static roomJiraDomain = '';
}
