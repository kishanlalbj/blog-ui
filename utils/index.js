import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../src/reducers/index';
import { middlewares } from '../src/store';

export const findTestByAttr = (wrapper, val) =>
  wrapper.find(`[data-test='${val}']`);

export const storeFactory = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
  return store;
};
