import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router';
import Article from './containers/Article/Article';
import Landing from './containers/Landing/Landing';
import Admin from './containers/Admin/Admin';
import { checkAuth, getUserFromToken } from './utils/checkAuth';
import { connect } from 'react-redux';
import { types } from './actions/types';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useLocation } from 'react-router-dom';

function App(props) {
  let isAuth = checkAuth();
  let history = useHistory();

  console.log('adasd asdasdasd', history);

  if (isAuth) {
    const user = getUserFromToken();
    props.setUser(user);
    if (user.role === 'admin') history.push(history.location.pathname);
    else history.push(history.location.pathname);
  } else {
    history.push('/');
  }

  return (
    <div data-test='app' className='App'>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/article/:articleId' component={Article}></Route>
        <ProtectedRoute exact path='/admin' component={Admin}></ProtectedRoute>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: types.LOGIN_SUCCESS, payload: user })
});

export default connect(null, mapDispatchToProps)(App);
