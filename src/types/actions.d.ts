interface IAction {
  type: string;
}

interface IRoomAction extends IAction {
  payload:
    | IRoomInfoPayload
    | IUsersAndRoomstate
    | IUsersAndSubmittedUsers
    | IResetRoom
    | IStory
    | string
    | boolean
    | number
    | undefined
    | IUser[];
}

interface IUserAction extends IAction {
  payload: IUserInfoPayload | string | number | boolean;
}
