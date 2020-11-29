const reducer = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case 'something':
      return !state;
    default:
      return state;
  }
};

export default reducer;
