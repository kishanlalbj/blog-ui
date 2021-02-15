import { types } from '../types';
import { fetchArticles } from './articlesActions';

describe('Articles actions', () => {
  test('should return  an action with type `FETCH_ARTICLES`', () => {
    const action = fetchArticles();
    expect(action).toEqual({
      type: types.FETCH_ARTICLES
    });
  });
});
