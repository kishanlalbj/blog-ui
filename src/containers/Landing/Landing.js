import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArticleList from '../../components/ArticlesList/ArticleList';
import Hero from '../../components/Hero/Hero';
import './Landing.scss';
import { fetchArticles } from '../../actions/articles';

const Landing = (props) => {
  const { articles, loading, next, previous } = props;

  useEffect(() => {
    const fetchArticles = () => {
      const { fetchAllArticles } = props;
      fetchAllArticles();
    };
    fetchArticles();
  }, []);

  const nextPage = () => {
    const page = props.next.page;
    // console.log('Next', page);
    props.fetchAllArticles(page);
  };

  const previousPage = () => {
    const page = props.previous.page;
    // console.log('Previous', page);

    props.fetchAllArticles(page);
  };

  return (
    <div data-test='landing'>
      <Hero data-test='hero-landing'></Hero>
      <Container>
        <Row
          style={{ height: '100%', minHeight: '100vh', position: 'relative' }}
        >
          {!loading ? (
            <ArticleList articles={articles}></ArticleList>
          ) : (
            <Col md={12} sm={12}>
              <div className='spinner' data-test='spinner'>
                <FontAwesomeIcon icon={faSpinner} size='4x'></FontAwesomeIcon>
              </div>
            </Col>
          )}
        </Row>
        <div className='pagination-buttons'>
          {previous !== undefined ? (
            <FontAwesomeIcon
              className='btn-icon'
              onClick={previousPage}
              color={'#a11692'}
              icon={faArrowAltCircleLeft}
              size='2x'
            ></FontAwesomeIcon>
          ) : (
            <p>{'  '}</p>
          )}

          {next !== undefined ? (
            <FontAwesomeIcon
              className='btn-icon'
              onClick={nextPage}
              color={'#a11692'}
              icon={faArrowAltCircleRight}
              size='2x'
            ></FontAwesomeIcon>
          ) : (
            <p> </p>
          )}
        </div>
      </Container>
    </div>
  );
};

// Hero.propTypes = {
//   articles: PropTypes.array.isRequired
// };

const mapStateToProps = (state) => ({
  articles: state.articles.allArticles,
  loading: state.articles.loading,
  next: state.articles.next,
  previous: state.articles.previous
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllArticles: (page) => dispatch(fetchArticles(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
