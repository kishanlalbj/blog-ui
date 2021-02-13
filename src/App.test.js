import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findTestByAttr } from '../utils';

const setUp = (props = {}) => {
  const component = shallow(<App {...props}></App>);
  return component;
};

describe('rending app', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it('should render app', () => {
    const app = findTestByAttr(wrapper, 'app');
    expect(app.length).toBe(1);
  });
});
