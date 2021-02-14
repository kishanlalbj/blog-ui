import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { findTestByAttr } from '../../../utils';

describe('Footer Component', () => {
  it('render without error', () => {
    const wrapper = shallow(<Footer></Footer>);
    const footerComponent = findTestByAttr(wrapper, 'footer');
    expect(footerComponent.length).toBe(1);
  });

  it('render footer svg image', () => {
    const wrapper = shallow(<Footer></Footer>);
    const svgComponent = findTestByAttr(wrapper, 'footer-svg');
    expect(svgComponent.length).toBe(1);
  });
});
