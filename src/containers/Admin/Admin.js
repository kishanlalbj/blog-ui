import { makeStyles, Toolbar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchArticles } from '../../actions/articles/articlesActions';
import { googleLogin, logoutUser } from '../../actions/auth/authActions';
import Header from '../../components/Header/Header';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { API_BASE_URL } from '../../constants';
import './Admin.scss';
import Articles from './Articles/Articles';
import Dashboard from './Dashboard/Dashboard';
import ArticleBuilder from '../ArticleBuilder/ArticleBuilder';
import Users from './Users/Users';
import Drafts from './Drafts/Drafts';
import Edit from './Edit/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: 'whitesmoke',
    height: '100vh',
    overflowY: 'auto'
  },
  paper: {
    padding: '10px'
  }
}));

const Admin = (props) => {
  const {
    fetchArticles,
    user,
    onLogout,
    isAuthenticated,
    handleGoogleLogin
  } = props;

  const classes = useStyles();

  const [dashboard, setDashboardData] = useState({});

  const getDashboardData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };
    let resp = await axios.get(`${API_BASE_URL}/admin/dashboard`, config);
    return resp.data;
  };

  useEffect(() => {
    getDashboardData().then((data) => {
      console.log(data);
      setDashboardData({ ...data });
    });
    fetchArticles(1, 10);
  }, []);

  return (
    <div data-test='admin-component' className={classes.root}>
      <Header
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        user={user}
        handleGoogleResponse={handleGoogleLogin}
        hasDrawer={true}
      ></Header>
      <main className={classes.content}>
        <Toolbar></Toolbar>
        <Switch>
          {/* <ProtectedRoute
            exact
            path={`/admin`}
            component={Dashboard}
          ></ProtectedRoute> */}
          <ProtectedRoute
            exact
            path={`/admin`}
            component={Articles}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path={`/admin/articles/edit/:id`}
            component={Edit}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path={`/admin/drafts`}
            component={Drafts}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path={`/admin/articles/new`}
            component={ArticleBuilder}
          ></ProtectedRoute>
          <Route exact path={`/admin/users`} component={Users}></Route>
        </Switch>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  next: state.articles.next,
  previous: state.articles.previous,
  loading: state.articles.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: (page, limit = 5) => dispatch(fetchArticles(page, limit)),
  handleGoogleLogin: (tokenId) => dispatch(googleLogin(tokenId)),
  onLogout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
