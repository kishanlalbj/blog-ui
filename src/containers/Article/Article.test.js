import { shallow } from 'enzyme';
import { findTestByAttr, storeFactory } from '../../../utils';
import Article from './Article';

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);

  return shallow(<Article store={store}></Article>)
    .dive()
    .dive();
};

describe('Article Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({ match: { params: 123 } });
  });

  it('should display article page', () => {
    const articleComponent = findTestByAttr(wrapper, 'article-component');
    expect(articleComponent.length).toBe(1);
  });

  it('should display footer', () => {
    const articleCreatedOn = findTestByAttr(wrapper, 'article-footer');
    expect(articleCreatedOn.length).toBe(1);
  });

  it('should display comments if there are any', () => {
    wrapper.setState({
      comments: [{ commenterName: 'Kishan', commentText: 'comment' }]
    });
    let comments = findTestByAttr(wrapper, 'comments');
    expect(comments.length).toBe(1);
  });

  it('should not display comments if there is none', () => {
    wrapper.setState({
      comments: []
    });

    let comments = findTestByAttr(wrapper, 'comments');
    expect(comments.length).toBe(0);
  });
});
