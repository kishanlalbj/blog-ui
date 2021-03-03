import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { findTestByAttr } from '../../../utils';

const setUp = (props = {}) => shallow(<Login {...props}></Login>);

describe('Login', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('should render login component', () => {
    const loginComponent = findTestByAttr(wrapper, 'login-component');
    expect(loginComponent.length).toBe(1);
  });
});
