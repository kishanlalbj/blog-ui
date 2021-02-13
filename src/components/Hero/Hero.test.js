import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';
import { findTestByAttr } from '../../../utils';

const setUp = () => shallow(<Hero />);

describe('Hero component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('should render without error', () => {
    const heroComponent = findTestByAttr(wrapper, 'hero-page');
    expect(heroComponent.length).toBe(1);
  });

  it('should render the svg', () => {
    const svgComponent = findTestByAttr(wrapper, 'hero-svg');

    expect(svgComponent.length).toBe(1);
  });

  it('should render the logobox', () => {
    const logoBoxComponent = findTestByAttr(wrapper, 'hero-logo-box');
    expect(logoBoxComponent.length).toBe(1);
  });
});
