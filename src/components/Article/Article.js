import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Article = (props) => {
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
            <p> {props.title}</p>
          </Card.Title>

          <Card.Subtitle className='mb-2 text-muted'>
            <p>{props.subtitle}</p>
            <p className='chip'>{props.tag}</p>
          </Card.Subtitle>
          <Card.Text>{props.content?.substr(0, 140)}...</Card.Text>
          <Card.Text className='mb-2 text-muted'>
            <p>Posted on {new Date(props.createdOn).toLocaleDateString()}</p>
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired
};

export default Article;
