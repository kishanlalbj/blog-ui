import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { Typography, makeStyles } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import moment from 'moment';
import { Comment } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    height: 'auto'
  },
  media: {
    height: 140,
    minHeight: 140,
    maxHeight: 140
  },
  expand: {
    marginLeft: 'auto'
  },
  flex: {
    flexGrow: 1
  }
});

const NewArticleCard = (props) => {
  const classes = useStyles();

  const {
    articleId,
    articleCover,
    articleTitle,
    articleSubtitle,
    articleCategory,
    articleContent,
    createdOn,
    onReadMore,
    totalComments
  } = props;

  return (
    <Card className={classes.root}>
      <CardMedia image={articleCover} className={classes.media}></CardMedia>
      <CardContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Chip size='small' color='secondary' label={articleCategory}></Chip>
            <Typography variant='h6'>{articleTitle}</Typography>
            <Typography variant='subtitle1'>{articleSubtitle}</Typography>
          </div>
          <div>
            <Typography paragraph>{moment(createdOn).format('ll')}</Typography>
          </div>
        </div>
        <br></br>
        <div
          style={{
            height: '105px'
          }}
          dangerouslySetInnerHTML={{ __html: articleContent.substr(0, 140) }}
        ></div>
      </CardContent>
      <CardActions>
        <div className={classes.flex}>
          <Button color='primary' onClick={() => onReadMore(articleId)}>
            Read More
          </Button>
        </div>
        <div>
          {totalComments} <Comment size='small' color='primary'></Comment>
        </div>
      </CardActions>
    </Card>
  );
};

NewArticleCard.defaultProps = {
  articleCover: 'pexels.jpg'
};

export default NewArticleCard;
