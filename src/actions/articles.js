import { FETCH_ALL_ARTICLES, SET_ARTICLES_LOADER } from './types';
import axios from 'axios';
import { ARTICLES } from '../api/constants';

export const fetchArticles = (page = 1) => async (dispatch) => {
  dispatch({ type: SET_ARTICLES_LOADER });
  let response = await axios.get(ARTICLES.replace('{page}', page));
  dispatch({ type: SET_ARTICLES_LOADER });
  return dispatch({
    type: FETCH_ALL_ARTICLES,
    payload: response.data
  });
};
