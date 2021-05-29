import { types } from '../types';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';

export const fetchArticles =
  (page = 1) =>
  async (dispatch) => {
    dispatch({
      type: types.SET_LOADING,
      payload: true
    });
    let response = await axios.get(
      `${API_BASE_URL}/articles?page=${page}&limit=4`
    );
    dispatch({
      type: types.SET_LOADING,
      payload: false
    });

    return dispatch({
      type: types.FETCH_ARTICLES,
      payload: {
        articles: response.data.results,
        next: response.data.next,
        previous: response.data.previous
      }
    });
  };
