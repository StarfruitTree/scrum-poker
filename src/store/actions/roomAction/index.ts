export function updateRoomInfo(payload: IRoomInfoPayload): IRoomAction {
  return {
    type: 'UPDATE_ROOM_INFO',
    payload: payload,
  };
}

export function updateRoomConnection(payload: IRoomConnectionPayload): IRoomAction {
  return {
    type: 'UPDATE_ROOM_INFO',
    payload: payload,
  };
}

export function updateSubmittedUsers(payload: ISubmmitedUsersPayload): IRoomAction {
  return {
    type: 'UPDATE_ROOM_INFO',
    payload: payload,
  };
}
