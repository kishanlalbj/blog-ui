import { Route, Switch } from 'react-router';
import Article from './containers/Article/Article';
import Landing from './containers/Landing/Landing';
import Login from './containers/Login/Login';

function App() {
  return (
    <div data-test='app' className='App'>
      {/* <Header></Header> */}

      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/article/:articleId' component={Article}></Route>
      </Switch>
    </div>
  );
}

export default App;
