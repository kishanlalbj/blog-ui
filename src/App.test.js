import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const setUp = (props = {}) => {
  const component = shallow(<App {...props}></App>);
  return component;
};

const findTestByAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe('rending app', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it('should render app', () => {
    const app = findTestByAttr(wrapper, 'app');
    expect(app.length).toBe(1);
  });

  it('should display the counter', () => {
    const counter = findTestByAttr(wrapper, 'app-counter');
    expect(counter.length).toBe(1);
  });
});

describe('Increment Counter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });
  it('should display the increment counter button', () => {
    const button = findTestByAttr(wrapper, 'app-button-increment');
    expect(button.length).toBe(1);
  });

  it('should increment the counter', () => {
    const incrementButton = findTestByAttr(wrapper, 'app-button-increment');
    incrementButton.simulate('click');

    const count = findTestByAttr(wrapper, 'app-counter').text();
    expect(Number(count)).toBe(1);
  });
});

describe('Decrement counter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setUp();
  });

  it('should display the button  decrement', () => {
    const decrementCounter = findTestByAttr(wrapper, 'app-button-decrement');

    expect(decrementCounter.length).toBe(1);
  });

  it('should decrement the counter', () => {
    const decrementCounter = findTestByAttr(wrapper, 'app-button-decrement');

    decrementCounter.simulate('click');
    const count = findTestByAttr(wrapper, 'app-counter').text();
    expect(Number(count)).toBe(-1);
  });
});
