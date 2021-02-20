import { types } from '../../actions/types';
import articlesReducer from './articleReducer';

describe('Articles Reducer', () => {
  it('return default state', () => {
    const newState = articlesReducer(undefined, {});
    expect(newState).toEqual({
      articles: [],
      next: {},
      previous: {},
      loading: false
    });
  });

  it('returns articles from state', () => {
    const newState = articlesReducer(undefined, {
      type: types.FETCH_ARTICLES,
      payload: {
        articles: [{ title: 'test', subtitle: 'test' }],
        next: { page: 1, limit: 4 },
        previous: { page: 2, limit: 4 },
        loading: false
      }
    });

    expect(newState).toEqual({
      articles: [{ title: 'test', subtitle: 'test' }],
      next: { page: 1, limit: 4 },
      previous: { page: 2, limit: 4 },
      loading: false
    });
  });
});
