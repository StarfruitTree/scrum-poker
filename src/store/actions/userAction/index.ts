export function updateUserInfo(payload: IUserInfoPayload): IUserAction {
  return {
    type: 'UPDATE_USER_INFO',
    payload: payload,
  };
}

export function updateUserRole(payload: IUserRolePayload): IUserAction {
  return {
    type: 'UPDATE_USER_ROLE',
    payload: payload,
  };
}

export function updateUserAction(payload: IUserActionPayload): IUserAction {
  return {
    type: 'UPDATE_USER_ACTION',
    payload: payload,
  };
}

export function updateUserPoint(payload: IUserPointPayload): IUserAction {
  return {
    type: 'UPDATE_USER_POINT',
    payload: payload,
  };
}

export function updateIsCardLocked(payload: IIsCardLockedPayload): IUserAction {
  return {
    type: 'UPDATE_IS_CARD_LOCKED',
    payload: payload,
  };
}
