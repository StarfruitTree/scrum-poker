export function updateRoomInfo(roomInfo: IRoomInfoPayload): IRoomAction {
  return {
    type: 'UPDATE_ROOM_INFO',
    payload: roomInfo,
  };
}

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

export function resetRoom(payload: IResetRoom): IRoomAction {
  return {
    type: 'RESET_ROOM',
    payload: payload,
  };
}
