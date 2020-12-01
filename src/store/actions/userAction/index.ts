import { Dispatch } from 'redux';
import { SIGN_UP } from '@scrpoker/constants/apis';
export function signUp(signUpData: ISignUpData) {
  return async (dispatch: Dispatch): Promise<IUserAction | void> => {
    return await fetch(SIGN_UP, {
      method: 'POST',
      body: JSON.stringify(signUpData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: data,
        })
      )
      .catch((err) => console.log(err));
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
