import { initialUserData } from '@scrpoker/constants/objects';
import { act } from 'react-test-renderer';

const reducer = (state: IUserData = initialUserData, action: IUserAction): IUserData => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...(action.payload as IUserInfoPayload) };
    case 'UPDATE_USER_ACTION':
      return { ...state, action: action.payload as number };
    case 'UPDATE_JIRA_TOKEN':
      return { ...state, ...(action.payload as IJiraTokenPayload) };
    default:
      return state;
  }
};

export default reducer;
