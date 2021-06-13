import {
  faUserAlt,
  faPenFancy,
  faDraftingCompass
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../actions/articles/articlesActions';
import { logoutUser } from '../../actions/auth/authActions';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import Header from '../../components/Header/Header';
import { API_BASE_URL } from '../../constants';
import './Admin.scss';
// import TrendChart from '../../components/Charts/TrendChart';

const Admin = (props) => {
  const { fetchArticles, articles, user, logout, next, previous } = props;

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
    <div>
      <Header user={user} onLogout={logout}></Header>

      <Container className='admin-container'>
        <Row>
          <Col md={{ span: 4, offset: 0 }}>
            <DashboardCard
              icon={faUserAlt}
              title='Subscribers'
              value={dashboard.users}
              backgroundColor={'#362a24'}
            ></DashboardCard>
          </Col>

          <Col md={{ span: 4, offset: 0 }}>
            <DashboardCard
              icon={faPenFancy}
              title='Articles'
              value={dashboard.public}
              backgroundColor={'#0e7680'}
            ></DashboardCard>
          </Col>

          <Col md={{ span: 4, offset: 0 }}>
            <DashboardCard
              icon={faDraftingCompass}
              title='Drafts'
              value={dashboard.draft}
              backgroundColor={'#a34a5a'}
            ></DashboardCard>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <h4>Articles </h4>

              {/* <input
                className='search-input'
                placeholder='Search'
                value={''}
              ></input> */}
              <Link to='/admin/article/new'>
                <button className='btn-custom'>New</button>
              </Link>
            </div>
            <br></br>
            <Table hover bordered variant='dark' responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Visits</th>
                  <th>Likes</th>
                  <th>Created On</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr>
                    <td>{article.articleTitle}</td>
                    <td>{article.articleCategory}</td>
                    <td>{article.visits}</td>
                    <td>{article.likes}</td>
                    <td>{moment(article.createdOn).format('ll')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className='navigationContainer'>
              {previous ? (
                <button className='btn-custom' onClick={handlePrevious}>
                  {' '}
                  Previous{' '}
                </button>
              ) : (
                <span> </span>
              )}
              {next ? (
                <button className='btn-custom' onClick={handleNext}>
                  {' '}
                  Next{' '}
                </button>
              ) : (
                <span> </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  next: state.articles.next,
  previous: state.articles.previous,
  loading: state.articles.loading,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: (page, limit = 5) => dispatch(fetchArticles(page, limit)),
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
