import { types } from '../types';

export const fetchArticles = () => (dispatch) => {
  return {
    type: types.FETCH_ARTICLES,
    articles: []
  };
};
