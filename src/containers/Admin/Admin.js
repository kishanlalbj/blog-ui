import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../actions/articles/articlesActions';
import { logoutUser, googleLogin } from '../../actions/auth/authActions';
import Header from '../../components/Header/Header';
import { API_BASE_URL } from '../../constants';
import TrendChart from '../../components/Charts/TrendChart';
import './Admin.scss';
import {
  Typography,
  Grid,
  Toolbar,
  Paper,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: 'whitesmoke',
    height: '100vh'
  },
  paper: {
    padding: '10px'
  }
}));

const Admin = (props) => {
  const {
    fetchArticles,
    articles,
    user,
    onLogout,
    isAuthenticated,
    next,
    previous,
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

  const handlePrevious = () => {
    fetchArticles(props.previous.page);
  };

  const handleNext = () => {
    fetchArticles(props.next.page);
  };

  useEffect(() => {
    getDashboardData().then((data) => {
      console.log(data);
      setDashboardData({ ...data });
    });
    fetchArticles(1, 5);
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

        <Grid container spacing={3}>
          {['Users', 'Articles', 'Drafts'].map((item) => (
            <Grid key={item} item md={4}>
              <Paper className={classes.paper}>
                <Typography varaint='h6'>{item}</Typography>
              </Paper>
            </Grid>
          ))}

          <Grid item md={6}>
            <Paper className={classes.paper}>
              <h4>Users</h4>
              <TrendChart></TrendChart>
            </Paper>
          </Grid>
        </Grid>
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
