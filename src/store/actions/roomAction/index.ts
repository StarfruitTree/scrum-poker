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
    .then(({ roomId, roomCode, roomName, description }: IRoomInfoPayload) => {
      dispatch({
        type: 'UPDATE_ROOM_INFO',
        payload: {
          roomId,
          roomCode,
          roomName,
          description,
        },
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export function updateRoomConnection(roomConnection: any): IRoomAction {
  return {
    type: 'UPDATE_ROOM_CONNECTION',
    payload: roomConnection,
  };
}

export function updateRoomState(roomState: string): IRoomAction {
  return {
    type: 'UPDATE_ROOM_STATE',
    payload: roomState,
  };
}

export function updateUsersAndRoomState(payload: IUsersAndRoomstate): IRoomAction {
  return {
    type: 'UPDATE_USERS_AND_ROOM_STATE',
    payload: payload,
  };
}

export function updatePoint(point: number): IRoomAction {
  return {
    type: 'UPDATE_POINT',
    payload: point,
  };
}

export function updateUsersAndCanBeRevealed(payload: IUsersAndCanBeRevealed): IRoomAction {
  return {
    type: 'UPDATE_USERS_AND_CAN_BE_REVEALED',
    payload: payload,
  };
}

export function updateUsersAndSubmittedUsers(payload: IUsersAndSubmittedUsers): IRoomAction {
  return {
    type: 'UPDATE_USERS_AND_SUBMITTED_USERS',
    payload: payload,
  };
}

export function updateSubmittedUsers(submittedUsers: number): IRoomAction {
  return {
    type: 'UPDATE_SUBMITTED_USERS',
    payload: submittedUsers,
  };
}

export function updateCanBeRevealed(canBeRevealed: boolean): IRoomAction {
  return {
    type: 'UPDATE_CAN_BE_REVEALED',
    payload: canBeRevealed,
  };
}

export function updateIsLocked(isLocked: boolean): IRoomAction {
  return {
    type: 'UPDATE_IS_LOCKED',
    payload: isLocked,
  };
}

export function updateCurrentStory(story: IStory | undefined): IRoomAction {
  return {
    type: 'UPDATE_CURRENT_STORY',
    payload: story,
  };
}

export function resetRoom(payload: IResetRoom): IRoomAction {
  return {
    type: 'RESET_ROOM',
    payload: payload,
  };
}
