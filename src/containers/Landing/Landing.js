import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ArticlesList from '../../components/ArticlesList/ArticleList';
import Hero from '../../components/Hero/Hero';
import './Landing.scss';
import { fetchArticles } from '../../actions/articles/articlesActions';
import Footer from '../../components/Footer/Footer';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      articles: this.props.articles,
      called: false
    };
    this.landingContainer = React.createRef();

    this.onScrollHandler = this.onScrollHandler.bind(this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      JSON.stringify(prevProps.articles) !== JSON.stringify(this.props.articles)
    ) {
      console.log('old articles', prevProps.articles);
      console.log('new articles', this.props.articles);
      this.setState(() => ({
        articles: [...prevState.articles, ...this.props.articles]
      }));
    }
  };

  componentDidMount = () => {
    this.props.fetchArticles(this.state.page);
    window.addEventListener('scroll', this.onScrollHandler);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScrollHandler);
  };

  onScrollHandler = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 400
    ) {
      console.log("you're at the bottom of the page");

      if (
        (this.props.next && !this.state.called) ||
        (this.props.next && this.props.next?.page !== this.state.page)
      ) {
        this.setState({
          called: true,
          page: this.props.next?.page
        });
        this.props.fetchArticles(this.props.next?.page);
      }
    }
  };

  render() {
    const { loading } = this.props;
    const { articles } = this.state;
    return (
      <div
        data-test='landing'
        ref={this.landingContainer}
        onScroll={this.onScrollHandler}
      >
        <Hero></Hero>
        <Container>
          <Row className='landing-container-row'>
            <ArticlesList articles={articles}></ArticlesList>

            <Col md={12} sm={12}>
              <center>
                {loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    color={'#a11692'}
                    size='3x'
                    className='spinner'
                  />
                ) : null}
              </center>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}

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
