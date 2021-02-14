import axios from 'axios';

import { ARTICLES } from './constants';

export const getAllArticles = (page) => {
  const url = ARTICLES.replace('{page}', page);
  return axios.get(url);
};
