import { storeFactory } from '../utils/';
import { fetchArticles } from '../src/actions/articles/articlesActions';

describe('Articles actions', () => {
  const articles = [
    {
      articleTitle: 'title',
      articleSubtitle: 'subtitle',
      articleCategory: 'category',
      articleContent: 'content',
      createdOn: '123123131'
    }
  ];
  const emptyState = {
    articles: []
  };

  let store;
  let initialState = { articles };
  beforeEach(() => {
    store = storeFactory(initialState);
  });

  it('should have empty articles', () => {
    store.dispatch(fetchArticles(emptyState));
    const expectedState = {
      ...initialState
    };
    const newState = store.getState();
    expect(newState).toEqual(expectedState);
  });
});
