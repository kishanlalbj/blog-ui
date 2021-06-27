import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/articles/articlesActions';
import ArticlesList from '../../components/ArticlesList/ArticleList';
import Footer from '../../components/Footer/Footer';
import Hero from '../../components/Hero/Hero';
import { googleLogin, logoutUser } from '../../actions/auth/authActions';
import { useHistory } from 'react-router';
import './Landing.scss';

const Landing = (props) => {
  const history = useHistory();
  useEffect(() => {
    const getArticles = () => props.fetchArticles();
    getArticles();
  }, []);

  const handleNext = () => {
    props.fetchArticles(props.next.page);
  };

  const handlePrevious = () => {
    props.fetchArticles(props.previous.page);
  };

  const loginHandler = async (tokenId) => {
    props.handleGoogleLogin(tokenId);
  };

  const logoutHandler = () => {
    props.logout();
  };

  const goToArticle = (articleId) => {
    history.push(`/article/${articleId}`);
  };

  return (
    <div data-test='landing'>
      <Hero
        onLogin={loginHandler}
        onLogout={logoutHandler}
        isAuthenticated={props.isAuthenticated}
        user={props.user}
      ></Hero>
      <Container>
        <Row className='landing-container-row'>
          <Col md={12} sm={12}>
            {props.loading ? (
              <center>
                <FontAwesomeIcon
                  data-test='loader'
                  icon={faSpinner}
                  color={'#a11692'}
                  size='3x'
                  className='spinner'
                />
              </center>
            ) : (
              <ArticlesList
                articles={props.articles}
                goToArticle={goToArticle}
              ></ArticlesList>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12}>
            <div className='articles-navigation'>
              <div className='articles-navigation-previous'>
                {props.previous && (
                  <button
                    data-test='prevBtn'
                    className='btn-navigation'
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className='articles-navigation-next'>
                {props.next && (
                  <button
                    data-test='nextBtn'
                    className='btn-navigation'
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

Landing.propTypes = {
  articles: PropTypes.array.isRequired,
  next: PropTypes.object,
  previous: PropTypes.object
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
  fetchArticles: (page) => dispatch(fetchArticles(page)),
  handleGoogleLogin: (tokenId) => dispatch(googleLogin(tokenId)),
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
