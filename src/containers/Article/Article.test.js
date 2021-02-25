import { shallow } from 'enzyme';
import { findTestByAttr } from '../../../utils';
import Article from './Article';

const setUp = (props = {}) => shallow(<Article {...props}></Article>);

describe('Article Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({ match: { params: 123 } });
  });

  it('should display article page', () => {
    const articleComponent = findTestByAttr(wrapper, 'article-component');
    expect(articleComponent.length).toBe(1);
  });

  it('should display article title', () => {
    const articleTitle = findTestByAttr(wrapper, 'article-title');
    expect(articleTitle.length).toBe(1);
  });

  it('should display article subtitle', () => {
    const articleSubtitle = findTestByAttr(wrapper, 'article-subtitle');
    expect(articleSubtitle.length).toBe(1);
  });

  it('should display article createdOn', () => {
    const articleCreatedOn = findTestByAttr(wrapper, 'article-createdOn');
    expect(articleCreatedOn.length).toBe(1);
  });

  it('should display footer', () => {
    const articleCreatedOn = findTestByAttr(wrapper, 'article-footer');
    expect(articleCreatedOn.length).toBe(1);
  });
});
