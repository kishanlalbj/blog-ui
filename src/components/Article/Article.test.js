import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';
import checkPropTypes from 'check-prop-types';
import { findTestByAttr } from '../../../utils';

const defaultProps = {
  articleTitle: 'test',
  articleSubtitle: 'test',
  articleCategory: 'test',
  articleContent: 'test',
  createdOn: 'test'
};

const setUp = (props = {}) => {
  const setUpProps = { ...defaultProps, ...props };
  return shallow(<Article {...setUpProps}></Article>);
};

describe('Article', () => {
  it('should render without error', () => {
    const wrapper = setUp();
    const articleComponent = findTestByAttr(wrapper, 'article');
    expect(articleComponent.length).toBe(1);
  });

  it('should render read more button', () => {
    const wrapper = setUp();

    const articleComponentBtn = findTestByAttr(wrapper, 'readmore-btn');
    expect(articleComponentBtn.length).toBe(1);
  });

  it('should not give error for correct props', () => {
    const expectedProps = {
      articleTitle: 'test',
      articleSubtitle: 'test',
      articleCategory: 'test',
      articleContent: 'test',
      createdOn: 'test'
    };
    const propError = checkPropTypes(
      // eslint-disable-next-line react/forbid-foreign-prop-types
      Article.propTypes,
      expectedProps,
      'prop',
      Article.name
    );

    expect(propError).toBeUndefined();
  });
});
