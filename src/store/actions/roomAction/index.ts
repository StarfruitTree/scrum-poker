import { Dispatch } from 'redux';
import { JOIN_ROOM } from '@scrpoker/constants/apis';
import { ThunkAction } from 'redux-thunk';
import { getAuthHeader } from '@scrpoker/utils';

export const joinRoom = (roomCode: string): ThunkAction<Promise<void>, IGlobalState, unknown, IRoomAction> => (
  dispatch: Dispatch
) => {
  const joinRoomData = {
    roomCode,
  };
  return fetch(JOIN_ROOM, {
    method: 'POST',
    body: JSON.stringify(joinRoomData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
    },
  })
    .then((response) => response.json())
    .then(({ roomId, roomCode, roomName, description, role }: IRoomInfoPayload) => {
      dispatch({
        type: 'UPDATE_ROOM_INFO',
        payload: {
          roomId,
          roomCode,
          roomName,
          description,
          role,
        },
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateRoomInfo = (data: IRoomInfoPayload): IRoomAction => {
  return {
    type: 'UPDATE_ROOM_INFO',
    payload: data,
  };
};

export const updateRoomConnection = (roomConnection: any): IRoomAction => {
  return {
    type: 'UPDATE_ROOM_CONNECTION',
    payload: roomConnection,
  };
};

export const updateRoomState = (roomState: string): IRoomAction => {
  return {
    type: 'UPDATE_ROOM_STATE',
    payload: roomState,
  };
};

export const updateUsers = (users: IUser[]): IRoomAction => {
  return {
    type: 'UPDATE_USERS',
    payload: users,
  };
};

export const updateUsersAndRoomState = (payload: IUsersAndRoomstate): IRoomAction => {
  return {
    type: 'UPDATE_USERS_AND_ROOM_STATE',
    payload: payload,
  };
};

export const updatePoint = (point: number): IRoomAction => {
  return {
    type: 'UPDATE_POINT',
    payload: point,
  };
};

export const updateUsersAndSubmittedUsers = (payload: IUsersAndSubmittedUsers): IRoomAction => {
  return {
    type: 'UPDATE_USERS_AND_SUBMITTED_USERS',
    payload: payload,
  };
};

export const updateSubmittedUsers = (submittedUsers: number): IRoomAction => {
  return {
    type: 'UPDATE_SUBMITTED_USERS',
    payload: submittedUsers,
  };
};

export const updateIsLocked = (isLocked: boolean): IRoomAction => {
  return {
    type: 'UPDATE_IS_LOCKED',
    payload: isLocked,
  };
};

export const updateCurrentStory = (story: IStory | undefined): IRoomAction => {
  return {
    type: 'UPDATE_CURRENT_STORY',
    payload: story,
  };
};

export const updateCurrentStoryPoint = (point: number): IRoomAction => {
  return {
    type: 'UPDATE_CURRENT_STORY_POINT',
    payload: point,
  };
};

export const resetRoom = (payload: IResetRoom): IRoomAction => {
  return {
    type: 'RESET_ROOM',
    payload: payload,
  };
};

export const cleanUpRoomData = (payload: IRoomData): IRoomAction => {
  return {
    type: 'CLEAN_UP_ROOM_DATA',
    payload: payload,
  };
};

export const updateUsersAndRoomStateAndCurrentStoryPoint = (
  payload: IUsersAndRoomStateAndCurrentStoryPoint
): IRoomAction => {
  return {
    type: 'UPDATE_USERS_AND_ROOM_STATE_AND_CURRENT_STORY_POINT',
    payload: payload,
  };
};
