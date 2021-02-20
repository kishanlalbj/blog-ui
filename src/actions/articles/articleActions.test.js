import moxios from 'moxios';
import { storeFactory } from '../../../utils';
import { fetchArticles } from './articlesActions';

describe('get articles from server', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch articles from server', () => {
    const store = storeFactory();
    const response = {
      articles: [
        {
          articleTitle: 'test',
          articleSubtitle: 'test',
          articleCategory: 'test',
          articleContent: 'test',
          createdOn: 'test'
        }
      ],
      next: { page: 1, limit: 4 },
      previous: { page: 1, limit: 4 }
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          results: response.articles,
          next: response.next,
          previous: response.previous
        }
      });
    });

    return store.dispatch(fetchArticles()).then(() => {
      const newState = store.getState();

      expect(newState.articles).toEqual({
        articles: response.articles,
        next: response.next,
        previous: response.previous,
        loading: false
      });
    });
  });
});
