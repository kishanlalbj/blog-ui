import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ArticleCard.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import moment from 'moment';
import { Chip } from '@material-ui/core';

const ArticleCard = (props) => {
  const {
    articleId,
    articleSubtitle,
    articleTitle,
    articleCategory,
    createdOn,
    articleContent
  } = props;

  return (
    <div data-test='article' className='article-card'>
      <Card>
        <Card.Body>
          <Card.Title>
            <p> {articleTitle}</p>
          </Card.Title>

          <Card.Subtitle className='mb-2 text-muted'>
            <p>{articleSubtitle}</p>
            <Chip color='primary' label={articleCategory}></Chip>
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

          <Button
            as={Link}
            className='btn-custom'
            variant='secondary'
            label='Read More'
            to={`/article/${articleId}`}
            data-test='readmore-btn'
            onClick={() => props.onReadMore(articleId)}
          ></Button>
        </Card.Body>
      </Card>
    </div>
  );
};

ArticleCard.propTypes = {
  articleTitle: PropTypes.string.isRequired,
  articleSubtitle: PropTypes.string.isRequired,
  articleContent: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  articleCategory: PropTypes.string.isRequired
};

export default ArticleCard;
