import { Dispatch } from 'redux';
import { SIGN_UP } from '@scrpoker/constants/apis';

interface ISignUpResponse {
  jwtToken: string;
  userId: number;
  userName: string;
  expiration: number;
}

export const signUp = (signUpData: ISignUpData) => (dispatch: Dispatch): Promise<IUserAction | void> =>
  fetch(SIGN_UP, {
    method: 'POST',
    body: JSON.stringify(signUpData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(({ jwtToken, userId, userName, expiration }: ISignUpResponse) => {
      const date = new Date();
      date.setSeconds(expiration);
      document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;

      return dispatch({
        type: 'UPDATE_USER_INFO',
        payload: {
          jwtToken: jwtToken,
          userId: userId,
          userName: userName,
        },
      });
    })
    .catch((err) => console.log(err));

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
