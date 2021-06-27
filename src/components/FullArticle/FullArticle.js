import React from 'react';
import { Chip, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import './FullArticle.css';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import { Timer } from '@material-ui/icons';

const FullArticle = (props) => {
  const {
    articleImg,
    articleTitle,
    articleSubtitle,
    articleContent,
    createdOn,
    articleCategory
  } = props;

  return (
    <div>
      <Container>
        <div>
          <img
            src={articleImg}
            alt='articleBanner'
            className='articleImage'
          ></img>
        </div>
        <br></br>
        <br></br>
        <Typography variant='h4'>{articleTitle}</Typography>
        <Typography variant='subtitle1'>{articleSubtitle}</Typography>
        <Typography variant='body2'>
          {moment(createdOn).format('ll')}
        </Typography>

        <div>
          <Timer></Timer> 5min
        </div>

        <br></br>
        <div>
          <Chip color='secondary' label={articleCategory}></Chip>
        </div>
        <br></br>
        <Typography
          paragraph
          dangerouslySetInnerHTML={{ __html: articleContent }}
        ></Typography>
      </Container>
    </div>
  );
};

FullArticle.propTypes = {
  articleImg: PropTypes.string,
  articleTitle: PropTypes.string.isRequired,
  articleSubtitle: PropTypes.string.isRequired,
  articleCategory: PropTypes.string.isRequired,
  articleContent: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired
};

FullArticle.defaultProps = {
  articleImg: 'pexels.jpg'
};

export default FullArticle;
