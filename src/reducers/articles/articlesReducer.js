import {
  GET_ALL_ARTICLES,
  FETCH_ALL_ARTICLES,
  SET_ARTICLES_LOADER
} from '../../actions/types';

const INITIAL_STATE = {
  allArticles: [],
  next: null,
  previous: null,
  loading: false
};

const articleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return state.allArticles;
    case FETCH_ALL_ARTICLES:
      return {
        ...state,
        allArticles: [...action.payload.results],
        next: action.payload.next,
        previous: action.payload.previous
      };
    case SET_ARTICLES_LOADER:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
};

export default articleReducer;
