import React from 'react';
import { Card } from 'react-bootstrap';

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
          <Card.Title>{props.title}</Card.Title>

          <Card.Subtitle className='mb-2 text-muted'>
            <p>{props.createdOn}</p>
            <p className='chip'>{props.tag}</p>
          </Card.Subtitle>
          <Card.Text>{props.content?.substr(0, 140)}...</Card.Text>
          <button className='btn-custom'>Read More</button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Article;
