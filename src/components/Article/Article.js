import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Article = (props) => {
  const {
    articleSubtitle,
    articleTitle,
    articleCategory,
    createdOn,
    articleContent
  } = props;
  return (
    <div
      data-test='article'
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
          <Card.Text>{articleContent?.substr(0, 140)}...</Card.Text>
          <Card.Text className='mb-2 text-muted'>
            <p>Posted on {new Date(createdOn).toLocaleDateString()}</p>
          </Card.Text>
          <button data-test='readmore-btn' className='btn-custom'>
            Read More
          </button>
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
