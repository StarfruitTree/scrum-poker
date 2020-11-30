interface IAction {
  type: string;
}

interface IRoomAction extends IAction {
  payload: IRoomInfoPayload | ISubmmitedUsersPayload | IRoomConnectionPayload;
}
