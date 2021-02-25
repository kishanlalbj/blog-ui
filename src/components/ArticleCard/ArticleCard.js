import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ArticleCard.scss';
import Button from '../Inputs/Button/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Article = (props) => {
  const {
    articleId,
    articleSubtitle,
    articleTitle,
    articleCategory,
    createdOn,
    articleContent
  } = props;

  return (
    <div
      data-test='article'
      className='article-card'
      style={{
        marginBottom: '20px'
      }}
    >
      <Card>
        <Card.Body>
          <Card.Title>
            <p> {articleTitle}</p>
          </Card.Title>

          <Card.Subtitle className='mb-2 text-muted'>
            <p>{articleSubtitle}</p>
            <p className='chip'>{articleCategory}</p>
          </Card.Subtitle>

          <Card.Text
            className='card-body-test'
            dangerouslySetInnerHTML={{
              __html: articleContent?.substr(0, 140) + '...'
            }}
          ></Card.Text>
          <Card.Text className='mb-2 text-muted'>
            Posted on {moment(createdOn).format('LL')}
          </Card.Text>
          <br></br>
          <Link
            className='btn-custom'
            style={{
              textDecoration: 'none',
              color: '#000'
            }}
            to={`/article/${articleId}`}
            data-test='readmore-btn'
          >
            Read More
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

Article.propTypes = {
  articleTitle: PropTypes.string.isRequired,
  articleSubtitle: PropTypes.string.isRequired,
  articleContent: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  articleCategory: PropTypes.string.isRequired
};

Article.defaultProps = {
  articleTitle: '',
  articleSubtitle: '',
  articleCategory: '',
  articleContent: '',
  createdOn: ''
};
export default Article;
