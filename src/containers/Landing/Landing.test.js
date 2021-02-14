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
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = setUp(initialState);
  // });

  it('render without error', () => {
    const wrapper = setUp(initialState);
    const landingComponent = findTestByAttr(wrapper, 'landing');
    expect(landingComponent.length).toBe(1);
  });

  it('should have hero component', () => {
    const wrapper = setUp(initialState);
    const heroComponent = findTestByAttr(wrapper, 'hero-landing');
    expect(heroComponent.length).toBe(1);
  });

  it('should render the left arrow button', () => {
    const wrapper = setUp({
      articles: {
        previous: {
          page: 2
        }
      }
    });

    const leftButtonComponent = findTestByAttr(wrapper, 'left-btn');
    expect(leftButtonComponent.length).toBe(1);
  });

  it('should render right arrow button', () => {
    const wrapper = setUp({
      articles: {
        next: {
          page: 3
        }
      }
    });

    const rightComponent = findTestByAttr(wrapper, 'right-btn');
    expect(rightComponent.length).toBe(1);
  });
});
