import React, { Component } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import './Comments.scss';
class Comments extends Component {
  state = {
    isOpen: false
  };

  handleOpenReplies = () => {
    console.log('Toggling');
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { comment } = this.props;
    console.log(comment);
    const { isOpen } = this.state;

    return (
      <div data-test='comment-section'>
        <div key={comment.id} className='comments-container'>
          <h6>{comment.commenterName}</h6>
          <p>{comment.commentText}</p>
          <span>
            {comment.replies.length > 0 ? (
              <p
                onClick={this.handleOpenReplies}
                data-test='replies'
                className='comments-footer'
              >
                {comment.replies.length} Replies
              </p>
            ) : (
              <p className='comments-footer' onClick={this.handleOpenReplies}>
                Reply
              </p>
            )}
          </span>
          {isOpen ? (
            <div data-test='reply'>
              {comment.replies.map((reply) => (
                <div key={reply._id} className='reply'>
                  <span className='reply-name'>{reply.name}</span>- {reply.text}
                  <br></br>
                </div>
              ))}
              <div className='reply'>
                <Form>
                  <Row>
                    <Col md={2}>
                      <FormControl placeholder='Name'></FormControl>
                    </Col>
                    <Col md={8}>
                      <FormControl placeholder='Reply'></FormControl>
                    </Col>
                    <Col md={2}>
                      <button className='btn-transparent'>Reply</button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Comments;
