const initialState: IUserData = {
  jwtToken: '',
  userId: 0,
  userName: '',
  userRole: 0,
  action: '',
  point: -1,
  isCardLocked: false,
};

const reducer = (state: IUserData = initialState, action: IUserAction): IUserData => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return { ...state, ...(action.payload as IUserInfoPayload) };
    case 'UPDATE_USER_ACTION':
      return { ...state, ...(action.payload as IUserActionPayload) };
    case 'UPDATE_USER_POINT':
      return { ...state, ...(action.payload as IUserPointPayload) };
    case 'UPDATE_USER_ROLE':
      return { ...state, ...(action.payload as IUserRolePayload) };
    case 'UPDATE_IS_CARD_LOCKED':
      return { ...state, ...(action.payload as IIsCardLockedPayload) };
    default:
      return state;
  }
};

export default reducer;
