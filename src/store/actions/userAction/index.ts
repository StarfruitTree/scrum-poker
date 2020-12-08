import { Dispatch } from 'redux';
import { SIGN_UP, LOGIN, CREATE_ROOM } from '@scrpoker/constants/apis';

interface IUserInfoResponse {
  jwtToken: string;
  userId: number;
  userName: string;
  userRoomCode: string;
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
    .then(({ jwtToken, userId, userName, userRoomCode, expiration }: IUserInfoResponse) => {
      const date = new Date();
      date.setSeconds(expiration);
      document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;

      return dispatch({
        type: 'UPDATE_USER_INFO',
        payload: {
          jwtToken: jwtToken,
          userId: userId,
          userName: userName,
          userRoomCode: userRoomCode,
        },
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

export const login = (loginData: ILoginData) => (dispatch: Dispatch): Promise<IUserAction | void> =>
  fetch(LOGIN, {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(({ jwtToken, userId, userName, userRoomCode, expiration }: IUserInfoResponse) => {
      const date = new Date();
      date.setSeconds(expiration);
      document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;

      return dispatch({
        type: 'UPDATE_USER_INFO',
        payload: {
          jwtToken: jwtToken,
          userId: userId,
          userName: userName,
          userRoomCode: userRoomCode,
        },
      });
    })
    .catch((err) => console.log(err));
