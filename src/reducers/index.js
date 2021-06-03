import { combineReducers } from 'redux';
import articles from './articles/articleReducer';
import auth from './auth/authReducer';

export default combineReducers({
  articles: articles,
  auth: auth
});
