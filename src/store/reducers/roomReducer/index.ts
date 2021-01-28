import { initialRoomData } from '@scrpoker/constants/objects';

const reducer = (state: IRoomData = initialRoomData, action: IRoomAction): IRoomData => {
  switch (action.type) {
    case 'UPDATE_ROOM_INFO':
      return { ...state, ...(action.payload as IRoomInfoPayload) };
    case 'UPDATE_ROOM_CONNECTION':
      return { ...state, roomConnection: action.payload as string };
    case 'UPDATE_ROOM_STATE':
      return { ...state, roomState: action.payload as string };
    case 'UPDATE_USERS':
      return { ...state, users: action.payload as IUser[] };
    case 'UPDATE_USERS_AND_ROOM_STATE':
      return { ...state, ...(action.payload as IUsersAndRoomstate) };
    case 'UPDATE_USERS_AND_SUBMITTED_USERS':
      return { ...state, ...(action.payload as IUsersAndSubmittedUsers) };
    case 'UPDATE_POINT':
      return { ...state, point: action.payload as number };
    case 'UPDATE_IS_LOCKED':
      return { ...state, isLocked: action.payload as boolean };
    case 'UPDATE_CURRENT_STORY':
      return { ...state, currentStory: action.payload as IStory };
    case 'UPDATE_CURRENT_STORY_POINT':
      return { ...state, currentStoryPoint: action.payload as number };
    case 'RESET_ROOM':
      return { ...state, ...(action.payload as IResetRoom) };
    case 'CLEAN_UP_ROOM_DATA':
      return { ...state, ...(action.payload as IRoomData) };
    case 'UPDATE_USERS_AND_ROOM_STATE_AND_CURRENT_STORY_POINT':
      return { ...state, ...(action.payload as IUsersAndRoomStateAndCurrentStoryPoint) };
    case 'UPDATE_JIRA_ISSUE_IDS':
      return { ...state, jiraIssueIds: action.payload as string[] };
    default:
      return state;
  }
};

export default reducer;
