const initialState: IUserData = {
  jwtToken: '',
  userId: 0,
  name: '',
  action: '',
};

const reducer = (state: IUserData = initialState, action: IUserAction): IUserData => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...(action.payload as IUserInfoPayload) };
    case 'UPDATE_USER_ACTION':
      return { ...state, action: action.payload as string };
    default:
      return state;
  }
};

export default reducer;
