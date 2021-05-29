import axios from 'axios';
import React, { Component } from 'react';
import { Col, Form, FormControl, Row } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants';
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
      let resp = await axios.post(`${API_BASE_URL}/articles/comment/reply`, {
        articleId: this.props.articleId,
        commentId: this.props.comment._id,
        replyObj: {
          name: this.state.name,
          text: this.state.replyText
        }
      });

      console.log(resp.data);
      this.props.updateArticle();
      this.clearReplyForm();
    } catch (e) {
      console.log(e);
      this.setState({ error: 'Error replying to comment' });
    }
  };

  render() {
    const { comment } = this.props;
    const { isOpen, name, replyText } = this.state;

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
          {/* {error && <p>{error}</p>} */}
        </div>
      </div>
    );
  }
}

export default Comments;
