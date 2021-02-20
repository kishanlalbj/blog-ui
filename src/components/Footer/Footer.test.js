import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { findTestByAttr } from '../../../utils/index';

const setUp = (props = {}) => {
  return shallow(<Footer {...props}></Footer>);
};

describe('Footer component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('should render component', () => {
    let footerComp = findTestByAttr(wrapper, 'footer');
    expect(footerComp.length).toBe(1);
  });
});
