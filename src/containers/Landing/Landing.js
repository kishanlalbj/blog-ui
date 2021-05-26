import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ArticlesList from '../../components/ArticlesList/ArticleList';
import Hero from '../../components/Hero/Hero';
import './Landing.scss';
import { fetchArticles } from '../../actions/articles/articlesActions';
import Footer from '../../components/Footer/Footer';

const Landing = (props) => {
  const getArticles = useCallback(() => props.fetchArticles(), []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const handleNext = () => {
    props.fetchArticles(props.next.page);
  };

  const handlePrevious = () => {
    props.fetchArticles(props.previous.page);
  };

  return (
    <div data-test='landing'>
      <Hero></Hero>
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
              <ArticlesList articles={props.articles}></ArticlesList>
            )}
          </Col>

          <Col md={12} sm={12}>
            <div className='articles-navigation'>
              <div className='articles-navigation-previous'>
                {props.previous && (
                  <button className='btn-navigation' onClick={handlePrevious}>
                    Previous
                  </button>
                )}
              </div>

              <div className='articles-navigation-next'>
                {props.next && (
                  <button className='btn-navigation' onClick={handleNext}>
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
  loading: state.articles.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: (page) => dispatch(fetchArticles(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
