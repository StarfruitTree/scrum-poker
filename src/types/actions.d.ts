interface IAction {
  type: string;
}

interface IRoomAction extends IAction {
  payload: IRoomInfoPayload | ISubmmitedUsersPayload | IRoomConnectionPayload;
}

interface IUserAction extends IAction {
  payload: IUserInfoPayload | IUserPointPayload | IUserRolePayload | IIsCardLockedPayload | IUserActionPayload;
}
