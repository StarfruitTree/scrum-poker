import { initialUserData } from '@scrpoker/constants/objects';

const reducer = (state: IUserData = initialUserData, action: IUserAction): IUserData => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...(action.payload as IUserInfoPayload) };
    case 'UPDATE_USER_ACTION':
      return { ...state, action: action.payload as number };
    case 'UPDATE_JIRA_TOKEN':
      return { ...state, jiraToken: action.payload as string };
    default:
      return state;
  }
};

export default reducer;
