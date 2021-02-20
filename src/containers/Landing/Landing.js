import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ArticlesList from '../../components/ArticlesList/ArticleList';
import Hero from '../../components/Hero/Hero';
import './Landing.scss';
import { fetchArticles } from '../../actions/articles/articlesActions';

const Landing = (props) => {
  const { articles, next, previous, fetchArticles, loading } = props;

  useEffect(() => {
    props.fetchArticles();
  }, []);

  return (
    <div data-test='landing'>
      <Hero></Hero>
      <Container>
        <Row style={{ height: '100%', padding: '20px' }}>
          {!loading ? (
            <ArticlesList articles={articles}></ArticlesList>
          ) : (
            <Col md={12} xs={12} style={{ height: '750px' }} data-test='loader'>
              <div className='loader-container spinner'>
                <FontAwesomeIcon
                  color={'#a11692'}
                  icon={faSpinner}
                  size='2x'
                ></FontAwesomeIcon>
              </div>
            </Col>
          )}
        </Row>
        <div className='pagination-buttons'>
          {previous ? (
            <FontAwesomeIcon
              className='btn-icon'
              color={'#a11692'}
              icon={faArrowAltCircleLeft}
              size='2x'
              onClick={() => fetchArticles(previous.page)}
            ></FontAwesomeIcon>
          ) : (
            <div></div>
          )}
          {next ? (
            <FontAwesomeIcon
              className='btn-icon'
              color={'#a11692'}
              icon={faArrowAltCircleRight}
              size='2x'
              onClick={() => fetchArticles(next.page)}
            ></FontAwesomeIcon>
          ) : (
            <div></div>
          )}
        </div>
      </Container>
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
