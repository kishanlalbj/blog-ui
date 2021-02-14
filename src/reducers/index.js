import { combineReducers } from 'redux';
import articleReducer from './articles/articlesReducer';

export default combineReducers({
  articles: articleReducer
});
