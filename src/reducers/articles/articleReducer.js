import { types } from '../../actions/types';

const INITIAL_STATE = {
  articles: []
};

const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default articlesReducer;
