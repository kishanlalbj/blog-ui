import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router';
import Article from './containers/Article/Article';
import Landing from './containers/Landing/Landing';
import Admin from './containers/Admin/Admin';
import { checkAuth, getUserFromToken } from './utils/checkAuth';
import { connect } from 'react-redux';
import { types } from './actions/types';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ArticleBuilder from './containers/ArticleBuilder/ArticleBuilder';

function App(props) {
  let isAuth = checkAuth();
  let history = useHistory();

  if (isAuth) {
    const user = getUserFromToken();
    props.setUser(user);
    if (user.role === 'admin') history.push(history.location.pathname);
    else history.push(history.location.pathname);
  } else {
    if (history.location.pathname !== '/admin')
      history.push(history.location.pathname);
  }

  return (
    <div data-test='app' className='App'>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/article/:articleId' component={Article}></Route>
        <ProtectedRoute path='/admin' component={Admin}></ProtectedRoute>
        <ProtectedRoute
          exact
          path='/admin/article/new'
          component={ArticleBuilder}
        ></ProtectedRoute>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: types.LOGIN_SUCCESS, payload: user })
});

export default connect(null, mapDispatchToProps)(App);
