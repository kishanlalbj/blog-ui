import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';
import { findTestByAttr, storeFactory } from '../../../utils';

const initialState = {
  articles: {
    allArticles: [],
    loading: false,
    next: null,
    previous: null
  }
};

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Landing store={store}></Landing>)
    .dive()
    .dive();

  return wrapper;
};

describe('Landing page component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(initialState);
  });

  it('render without error', () => {
    const landingComponent = findTestByAttr(wrapper, 'landing');
    expect(landingComponent.length).toBe(1);
  });

  it('should have hero component', () => {
    const heroComponent = findTestByAttr(wrapper, 'hero-landing');
    expect(heroComponent.length).toBe(1);
  });
});
