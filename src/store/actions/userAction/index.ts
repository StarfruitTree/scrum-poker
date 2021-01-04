import { Dispatch } from 'redux';
import { SIGN_UP, LOGIN, AUTHENTICATE } from '@scrpoker/constants/apis';
import { ThunkAction } from 'redux-thunk';
import { getAuthHeader } from '@scrpoker/utils';
import { debug } from 'webpack';

interface IUserInfoResponse {
  jwtToken: string;
  userId: number;
  name: string;
  userRoomCode?: string;
  expiration: number;
  email?: string;
  isLoginFailed?: boolean;
}

export const signUp = (
  signUpData: ISignUpData
): ThunkAction<Promise<void | boolean>, IGlobalState, unknown, IRoomAction> => (dispatch: Dispatch) =>
  fetch(SIGN_UP, {
    method: 'POST',
    body: JSON.stringify(signUpData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else return { isLoginFailed: true };
    })
    .then(({ jwtToken, userId, name, userRoomCode, expiration, email, isLoginFailed }: IUserInfoResponse) => {
      if (isLoginFailed) {
        return false;
      } else {
        const date = new Date();
        date.setMinutes(date.getMinutes() + expiration);
        document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;
        document.cookie = `tokenExpiration=${date.toString()};expires=${date};path=/`;
        if (email) {
          document.cookie = `officialUser=thisuserhasemail;expires=${date};path=/`;
        }

        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: {
            userId,
            name,
            userRoomCode,
            email,
          },
        });

        return true;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });

export const login = (
  loginData: ILoginData
): ThunkAction<Promise<void | boolean>, IGlobalState, unknown, IRoomAction> => (dispatch: Dispatch) =>
  fetch(LOGIN, {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else return { isLoginFailed: true };
    })
    .then(({ jwtToken, userId, name, userRoomCode, expiration, email, isLoginFailed }: IUserInfoResponse) => {
      if (isLoginFailed) {
        return false;
      } else {
        const date = new Date();
        date.setMinutes(date.getMinutes() + expiration);
        document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;
        document.cookie = `tokenExpiration=${date.toString()};expires=${date};path=/`;
        if (email) {
          document.cookie = `officialUser=thisuserhasemail;expires=${date};path=/`;
        }

        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: {
            userId,
            name,
            userRoomCode,
            email,
          },
        });

        return true;
      }
    })
    .catch((err) => console.log(err));

export const authenticate = (): ThunkAction<Promise<void>, IGlobalState, unknown, IRoomAction> => (
  dispatch: Dispatch
) =>
  fetch(AUTHENTICATE, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader() as string,
    },
  })
    .then((response) => response.json())
    .then(({ userId, name, userRoomCode, email }: IUserInfoResponse) => {
      dispatch({
        type: 'UPDATE_USER_INFO',
        payload: {
          userId,
          name,
          userRoomCode,
          email,
        },
      });
    })
    .catch((err) => console.log(err));

export const updateUserInfo = (data: IUserInfoPayload): IUserAction => {
  return {
    type: 'UPDATE_USER_INFO',
    payload: data,
  };
};

export const updateUserAction = (action: string): IUserAction => {
  return {
    type: 'UPDATE_USER_ACTION',
    payload: action,
  };
};
