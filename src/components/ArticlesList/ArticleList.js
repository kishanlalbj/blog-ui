import React from 'react';
import Article from '../Article/Article';
import { Col } from 'react-bootstrap';

const ArticleList = (props) => {
  const { articles } = props;
  return (
    <React.Fragment>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <Col md={6} xs={12} sm={12} key={index} data-test='article-list'>
            <Article
              title={article.title}
              content={article.content}
              createdOn={article.createdOn}
              tag={article.tag}
            ></Article>
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

export default ArticleList;
