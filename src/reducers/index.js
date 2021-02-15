import { combineReducers } from 'redux';
import articles from './articles/articleReducer';

export default combineReducers({
  articles: articles
});
