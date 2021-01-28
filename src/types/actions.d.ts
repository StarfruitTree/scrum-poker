interface IAction {
  type: string;
}

interface IRoomAction extends IAction {
  payload:
    | IRoomInfoPayload
    | IUsersAndRoomstate
    | IUsersAndRoomStateAndCurrentStoryPoint
    | IUsersAndSubmittedUsers
    | IResetRoom
    | IStory
    | string
    | boolean
    | number
    | undefined
    | IUser[]
    | string[];
}

interface IUserAction extends IAction {
  payload: IUserInfoPayload | string | number | boolean;
}
