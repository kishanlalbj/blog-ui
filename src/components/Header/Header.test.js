import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import { findTestByAttr } from '../../../utils';

const setUp = (props = {}) => {
  const component = shallow(<Header {...props}></Header>);
  return component;
};

describe('Header component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it('should display header', () => {
    const header = findTestByAttr(wrapper, 'main-header');
    expect(header.length).toBe(1);
  });
});
