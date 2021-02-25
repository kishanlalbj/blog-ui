import React from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ArticleList = (props) => {
  const { articles } = props;
  return (
    <React.Fragment>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Col md={6} xs={12} sm={12} key={index} data-test='article-list'>
            <ArticleCard
              articleId={article._id}
              articleTitle={article.articleTitle}
              articleSubtitle={article.articleSubtitle}
              articleContent={article.articleContent}
              createdOn={article.createdOn}
              articleCategory={article.articleCategory}
            ></ArticleCard>
          </Col>
        ))
      ) : (
        <Col md={12} sm={12}>
          <center data-test='article-list-no-items'>
            <p>No Articles found</p>
          </center>
        </Col>
      )}
    </React.Fragment>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
