interface IAction {
  type: string;
}

interface IRoomAction extends IAction {
  payload:
    | IRoomInfoPayload
    | IUsersAndRoomstate
    | IUsersAndSubmittedUsers
    | IUsersAndCanBeRevealed
    | IResetRoom
    | string
    | boolean
    | number
    | IUser[];
}

interface IUserAction extends IAction {
  payload: IUserInfoPayload | string | number | boolean;
}
