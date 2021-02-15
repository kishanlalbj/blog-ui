import { types } from '../types';

export const fetchArticles = () => {
  return {
    type: types.FETCH_ARTICLES
  };
};
