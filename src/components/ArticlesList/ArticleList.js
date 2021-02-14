import React from 'react';
import Article from '../Article/Article';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ArticleList.scss';

const ArticleList = (props) => {
  const { articles } = props;
  return (
    <React.Fragment>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Col md={6} xs={12} sm={12} key={index} data-test='article-list'>
            <Article
              title={article.articleTitle}
              subtitle={article.articleSubtitle}
              content={article.articleContent}
              createdOn={article.createdOn}
              tag={article.articleCategory}
            ></Article>
          </Col>
        ))
      ) : (
        <Col md={12} sm={12}>
          <div data-test='article-list-no-items'>
            <center style={{ marginTop: '30px' }}>
              <h6>No Articles found</h6>
            </center>
          </div>
        </Col>
      )}
    </React.Fragment>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
