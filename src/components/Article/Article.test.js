import React from 'react';
import { shallow } from 'enzyme';
import Article from './Article';
import { findTestByAttr } from '../../../utils';

const setUp = (props = {}) => shallow(<Article {...props}></Article>);

const initialProps = {
  title: 'tes',
  createdOn: Date.now(),
  content: 'lorem ipsum',
  tag: 'Life'
};

describe('Article', () => {
  it('should render without error', () => {
    const wrapper = setUp(initialProps);
    const articleComponent = findTestByAttr(wrapper, 'article');
    expect(articleComponent.length).toBe(1);
  });

  it('should throw error if props is not passed', () => {
    const wrapper = setUp();
    const articleComponentTitle = findTestByAttr(wrapper, 'article').prop(
      'content'
    );
    expect(articleComponentTitle).toBeUndefined();
  });
});
