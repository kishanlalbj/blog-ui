import React from 'react';
import { Form, FormGroup, Row, Col, FormControl } from 'react-bootstrap';
import Button from '../Button/Button';
import { Avatar } from '@material-ui/core';

const CommentForm = (props) => {
  const { user, commentText, onChangeHandler, onPostComment } = props;
  return (
    <div>
      <Form>
        <Row>
          <Col md={{ span: 11, offset: 0 }} style={{ display: 'flex' }}>
            <Avatar src={user.avatar} imgProps={{ draggable: false }}></Avatar>
            <div
              style={{
                width: '100%',
                marginLeft: '20px'
              }}
            >
              <FormGroup>
                <FormControl
                  as='textarea'
                  cols={4}
                  rows={5}
                  name='commentText'
                  value={commentText}
                  onChange={onChangeHandler}
                  placeholder='Your Comment'
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <Button
                  variant='secondary'
                  label='Comment'
                  onClick={onPostComment}
                ></Button>
              </FormGroup>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CommentForm;
