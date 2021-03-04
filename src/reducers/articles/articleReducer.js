import { types } from '../../actions/types';

const INITIAL_STATE = {
  articles: [],
  next: {},
  previous: {},
  loading: false
};

const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES:
      const { articles, next, previous } = action.payload;
      return {
        ...state,
        articles,
        next,
        previous
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default articlesReducer;
