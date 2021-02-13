import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';
import { findTestByAttr } from '../../../utils';

const setUp = (props = {}) => shallow(<Landing {...props}></Landing>);

describe('Landing page component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('render without error', () => {
    const landingComponent = findTestByAttr(wrapper, 'landing');
    expect(landingComponent.length).toBe(1);
  });
});
