import React from 'react';
import { shallow } from 'enzyme';
import ArticleList from './ArticleList';
import { findTestByAttr } from '../../../utils/index';

const INITIAL_PROPS = {
  articles: [
    {
      title: 'test',
      content: 'content',
      tag: 'tag'
    }
  ]
};
const setUp = (props = {}) => shallow(<ArticleList {...props}></ArticleList>);

describe('Article List', () => {
  it('should render without error', () => {
    const wrapper = setUp(INITIAL_PROPS);
    const articleList = findTestByAttr(wrapper, 'article-list').dive();
    expect(articleList.length).toBe(1);
  });

  it('should say no articles found', () => {
    const wrapper = setUp({
      articles: []
    });
    const articleList = findTestByAttr(wrapper, 'article-list-no-items').text();
    expect(articleList).toBe('No Articles found');
  });
});
