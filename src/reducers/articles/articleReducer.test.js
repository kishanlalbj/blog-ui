import { GET_ALL_ARTICLES, FETCH_ALL_ARTICLES } from '../../actions/types';
import articleReducer from './articlesReducer';

const initialState = {
  allArticles: [
    {
      title: 'test'
    }
  ],
  next: null
};

describe('Article Reducer', () => {
  it('should return default state', () => {
    const newState = articleReducer(
      { allArticles: [] },
      { type: '', payload: '' }
    );
    expect(newState.allArticles.length).toEqual(0);
  });

  it('should get all articles from state', () => {
    const articles = articleReducer(initialState, { type: GET_ALL_ARTICLES });
    expect(articles.length).toBe(1);
  });

  it('should return all articles', () => {
    const newState = articleReducer(undefined, {
      type: FETCH_ALL_ARTICLES,
      payload: { results: [{ title: 'Test' }, { title: 'new post' }] }
    });

    expect(newState.allArticles.length).toBe(2);
  });
});
