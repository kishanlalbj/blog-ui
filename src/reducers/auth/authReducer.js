import { types } from '../../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
