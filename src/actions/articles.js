import { FETCH_ALL_ARTICLES, SET_ARTICLES_LOADER } from './types';
import { getAllArticles } from '../api/articles';

export const fetchArticles = (page = 1) => async (dispatch) => {
  dispatch({ type: SET_ARTICLES_LOADER });
  let response = await getAllArticles(page);
  dispatch({ type: SET_ARTICLES_LOADER });
  return dispatch({
    type: FETCH_ALL_ARTICLES,
    payload: response.data
  });
};
