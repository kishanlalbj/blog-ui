import { types } from '../../actions/types';
import articlesReducer from './articleReducer';

describe('Articles Reducer', () => {
  it('return default state', () => {
    const newState = articlesReducer(undefined, {});
    expect(newState).toEqual({ articles: [] });
  });

  it('returns articles from state', () => {
    const newState = articlesReducer(undefined, {
      type: types.FETCH_ARTICLES,
      payload: [{ title: 'test', subtitle: 'test' }]
    });

    expect(newState).toEqual({
      articles: [{ title: 'test', subtitle: 'test' }]
    });
  });
});
