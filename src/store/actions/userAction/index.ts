import { Dispatch } from 'redux';
import { SIGN_UP, LOGIN, AUTHENTICATE, CHANGE_NAME, SUBMIT_JIRA_USER_CREDENTIALS } from '@scrpoker/constants/apis';
import { ThunkAction } from 'redux-thunk';
import { getAuthHeader } from '@scrpoker/utils';
import { Actions } from '@scrpoker/store';
import { act } from 'react-test-renderer';

interface IJiraResponse {
  isSuccessful: boolean;
  data?: {
    error?: string;
    jiraToken?: string;
    jiraDomain?: string;
  };
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
        document.cookie = `userName=${name};expires=${date};path=/`;
        if (email) {
          document.cookie = `officialUser=thisuserhasemail;expires=${date};path=/`;
        }

        const userInfo: IUserInfoPayload = {
          userId,
          name,
          userRoomCode,
          email,
        };

        dispatch(Actions.userActions.updateUserInfo(userInfo));

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
    .then(
      ({
        jwtToken,
        jiraToken,
        jiraDomain,
        userId,
        name,
        userRoomCode,
        expiration,
        email,
        isLoginFailed,
      }: IUserInfoResponse) => {
        if (isLoginFailed) {
          return false;
        }

        const date = new Date();
        date.setMinutes(date.getMinutes() + expiration);
        document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;
        document.cookie = `tokenExpiration=${date.toString()};expires=${date};path=/`;
        if (email) {
          document.cookie = `officialUser=thisuserhasemail;expires=${date};path=/`;
        }

        const userInfo: IUserInfoPayload = {
          userId,
          name,
          userRoomCode,
          email,
          jiraToken,
          jiraDomain,
        };

        dispatch(Actions.userActions.updateUserInfo(userInfo));

        return true;
      }
    )
    .catch((err) => console.log(err));

export const authenticate = (): ThunkAction<Promise<void>, IGlobalState, unknown, IRoomAction> => (
  dispatch: Dispatch
) =>
  fetch(AUTHENTICATE, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
    },
  })
    .then((response) => response.json())
    .then(({ jiraToken, jiraDomain, userId, name, userRoomCode, email }: IUserInfoResponse) => {
      const userInfo: IUserInfoPayload = {
        userId,
        name,
        userRoomCode,
        email,
        jiraToken,
        jiraDomain,
      };

      dispatch(Actions.userActions.updateUserInfo(userInfo));
    })
    .catch((err) => console.log(err));

export const submitJiraUserCredentials = (
  data: IJiraUserCredentials
): ThunkAction<Promise<void | IJiraResponse>, IGlobalState, unknown, IRoomAction> => (dispatch: Dispatch) =>
  fetch(SUBMIT_JIRA_USER_CREDENTIALS, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (response.status === 201) {
        return {
          isSuccessful: true,
          data: await response.json(),
        };
      } else {
        return {
          isSuccessful: false,
          data: await response.json(),
        };
      }
    })
    .then(({ isSuccessful, data }: IJiraResponse) => {
      if (!isSuccessful) {
        return {
          isSuccessful: false,
          data: {
            error: data?.error,
          },
        };
      } else {
        dispatch({
          type: 'UPDATE_JIRA_TOKEN',
          payload: {
            jiraToken: data?.jiraToken as string,
            jiraDomain: data?.jiraDomain as string,
          },
        });

        return {
          isSuccessful: true,
        };
      }
    });

export const changeName = (
  changeNameData: IChangeNameData
): ThunkAction<Promise<void>, IGlobalState, unknown, IRoomAction> => (dispatch: Dispatch) =>
  fetch(CHANGE_NAME, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changeNameData),
  })
    .then((response) => response.json())
    .then(({ jwtToken, name, userId, email, expiration }: IUserInfoResponse) => {
      const date = new Date();
      date.setMinutes(date.getMinutes() + expiration);
      document.cookie = `jwtToken=${jwtToken};expires=${date};path=/`;
      document.cookie = `tokenExpiration=${date.toString()};expires=${date};path=/`;
      document.cookie = `userName=${name};expires=${date};path=/`;

      if (email) {
        document.cookie = `officialUser=thisuserhasemail;expires=${date};path=/`;
      }

      dispatch({
        type: 'UPDATE_USER_INFO',
        payload: {
          userId,
          name,
          email,
        },
      });
    });

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

export const updateIsJiraTokenValid = (data: boolean): IUserAction => {
  return {
    type: 'UPDATE_IS_JIRA_TOKEN_VALID',
    payload: data,
  };
};
