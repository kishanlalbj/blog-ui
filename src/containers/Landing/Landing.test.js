import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';
import { findTestByAttr, storeFactory } from '../../../utils';
import checkPropTypes from 'check-prop-types';

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);

  return shallow(<Landing store={store} handleNext={() => {}}></Landing>)
    .dive()
    .dive();
};

describe('Landing page component', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      articles: [],
      loading: false
    };
    wrapper = setUp(initialState);
  });

  it('render without error', () => {
    const landingComponent = findTestByAttr(wrapper, 'landing');
    expect(landingComponent.length).toBe(1);
  });

  it('should have proper prop types', () => {
    const expectedProps = { articles: [], next: {}, previous: {} };
    const propError = checkPropTypes(
      Landing.propTypes,
      expectedProps,
      'prop',
      Landing.name
    );
    expect(propError).toBeUndefined();
  });

  it('should not display loading if prop loading is true', () => {
    let loader = findTestByAttr(wrapper, 'loader');
    expect(loader.length).toBe(0);
  });
});

describe('Landing loader', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      articles: {
        articles: [],
        loading: true
      }
    };
    wrapper = setUp(initialState);
  });

  it('should display loading if prop loading is true', () => {
    let loader = findTestByAttr(wrapper, 'loader');
    expect(loader.length).toBe(1);
  });
});

describe('landing page next navigation', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      articles: {
        articles: [],
        next: {
          page: 2
        },
        previous: undefined
      }
    };
    wrapper = setUp(initialState);
  });

  it('should display next button', () => {
    let nextBtn = findTestByAttr(wrapper, 'nextBtn');
    expect(nextBtn.length).toBe(1);
  });

  it('should not display previous button', () => {
    let prevBtn = findTestByAttr(wrapper, 'prevBtn');
    expect(prevBtn.length).toBe(0);
  });
});

describe('landing page prev navigation', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      articles: {
        articles: [],
        next: undefined,
        previous: {
          page: 1
        }
      }
    };
    wrapper = setUp(initialState);
  });

  it('should not display next button', () => {
    let nextBtn = findTestByAttr(wrapper, 'nextBtn');
    expect(nextBtn.length).toBe(0);
  });

  it('should display previous button', () => {
    let prevBtn = findTestByAttr(wrapper, 'prevBtn');
    expect(prevBtn.length).toBe(1);
  });
});
