import { createStore } from 'redux';
import rootReducer from '../src/reducers';

export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState);
};

export const findTestByAttr = (wrapper, val) =>
  wrapper.find(`[data-test='${val}']`);
