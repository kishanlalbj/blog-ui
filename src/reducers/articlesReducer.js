const INITIAL_STATE = {};

const articleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_ALL_POSTS':
      return state;

    default:
      return state;
  }
};

export default articleReducer;
