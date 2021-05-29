import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import './Comments.scss';
class Comments extends Component {
  state = {
    isOpen: false,
    name: '',
    replyText: '',
    error: ''
  };

  handleOpenReplies = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  clearReplyForm = () => this.setState({ name: '', replyText: '' });

  handleReplyToComment = async (e) => {
    try {
      e.preventDefault();

      this.props.replyToComment(this.props.comment._id, {
        name: this.state.name,
        text: this.state.replyText
      });
      this.clearReplyForm();
    } catch (e) {
      console.log(e);
      this.setState({ error: 'Error replying to comment' });
    }
  };

  handleCommentDelete = () => {
    this.props.deleteComment(this.props.comment._id);
  };

  render() {
    const { comment } = this.props;
    const { isOpen, name, replyText } = this.state;

    return (
      <div data-test='comment-section'>
        <div key={comment._id} className='comments-container'>
          <div>
            <FontAwesomeIcon
              className='btn-icon'
              style={{
                float: 'right'
              }}
              icon={faTrashAlt}
              onClick={() => this.handleCommentDelete()}
              color='red'
            ></FontAwesomeIcon>
            <h6>{comment.commenterName}</h6>
            <p>{comment.commentText}</p>
          </div>
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
                <div key={reply._id} className='reply-container'>
                  <div className='reply'>
                    <span className='reply-name'>{reply.name}</span>-{' '}
                    {reply.text}
                  </div>
                </div>
              ))}
              <div className='reply'>
                <Form>
                  <Row>
                    <Col md={2}>
                      <FormControl
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={this.onChangeHandler}
                      ></FormControl>
                    </Col>
                    <Col md={8}>
                      <FormControl
                        placeholder='Reply'
                        name='replyText'
                        value={replyText}
                        onChange={this.onChangeHandler}
                      ></FormControl>
                    </Col>
                    <Col md={2}>
                      <button
                        className='btn-transparent'
                        onClick={this.handleReplyToComment}
                      >
                        Reply
                      </button>
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
