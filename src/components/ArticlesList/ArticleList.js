import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import NewArticleCard from '../NewArticleCard/NewArticleCard';

const ArticleList = (props) => {
  const { articles } = props;
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Grid
              item
              md={6}
              xs={12}
              key={article._id}
              data-test='article-list'
              style={{ height: 'auto' }}
            >
              <NewArticleCard
                articleId={article._id}
                articleTitle={article.articleTitle}
                articleSubtitle={article.articleSubtitle}
                articleContent={article.articleContent}
                createdOn={article.createdOn}
                articleCategory={article.articleCategory}
                onReadMore={props.goToArticle}
                totalComments={article.comments.length}
              ></NewArticleCard>
            </Grid>
          ))
        ) : (
          <Grid item md={12} xs={12}>
            <center data-test='article-list-no-items'>
              <p>No Articles found</p>
            </center>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticleList;
