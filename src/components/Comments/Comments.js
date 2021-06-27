import React, { Component } from 'react';
import { Col, Form, FormControl, Row, Modal } from 'react-bootstrap';
import { Avatar, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Button from '../Button/Button';

import './Comments.css';
import ReplyForm from '../ReplyForm/ReplyForm';
class Comments extends Component {
  state = {
    isOpen: false,
    name: '',
    replyText: '',
    error: '',
    confirmModal: false
  };

  handleOpenReplies = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  clearReplyForm = () => this.setState({ name: '', replyText: '' });

  openConfirmDialog = () =>
    this.setState((prevState) => ({
      confirmModal: !prevState.confirmModal
    }));

  handleReplyToComment = async (e) => {
    try {
      e.preventDefault();

      this.props.replyToComment(this.props.comment._id, {
        name: this.props.user?.name,
        text: this.state.replyText
      });
      this.clearReplyForm();
    } catch (e) {
      this.setState({ error: 'Error replying to comment' });
    }
  };

  handleCommentDelete = () => {
    this.props.deleteComment(this.props.comment._id);
  };

  render() {
    const { comment, isAdmin, user, isAuthenticated } = this.props;
    const { isOpen, confirmModal, replyText } = this.state;

    return (
      <div data-test='comment-section'>
        <div key={comment._id} className='comments-container'>
          <div>
            {isAdmin ? (
              <>
                <IconButton
                  style={{
                    float: 'right',
                    color: 'crimson'
                  }}
                  onClick={() => this.openConfirmDialog()}
                >
                  <Delete></Delete>
                </IconButton>
              </>
            ) : (
              <span></span>
            )}
            <h6>{comment.commenterName}</h6>
            <p>{comment.commentText}</p>
          </div>
          <span>
            {comment?.replies?.length > 0 ? (
              <p
                onClick={this.handleOpenReplies}
                data-test='replies'
                className='comments-footer'
              >
                {comment?.replies?.length} Replies
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
                  <div>
                    <Avatar alt={reply.name} color='primary'>
                      {reply.name.charAt(0)}
                    </Avatar>
                  </div>

                  <div className='reply-info'>
                    <h6>{reply.name}</h6>
                    <p paragraph>{reply.text}</p>
                  </div>
                </div>
              ))}
              <div className='reply'>
                {isAuthenticated ? (
                  <>
                    <ReplyForm
                      user={user}
                      replyText={replyText}
                      onChangeHandler={this.onChangeHandler}
                      handleReplyToComment={this.handleReplyToComment}
                    ></ReplyForm>
                  </>
                ) : // <Form data-test='reply-form'>
                //   <Row>
                //     <Col md={{ span: 1 }}>
                //       <img
                //         src={user?.avatar}
                //         style={{ borderRadius: '99px' }}
                //         width='30'
                //         height='30'
                //         title={user?.name}
                //         alt='avatar'
                //       ></img>
                //     </Col>
                //     <Col md={8}>
                //       <FormControl
                //         placeholder='Reply'
                //         name='replyText'
                //         value={replyText}
                //         onChange={this.onChangeHandler}
                //       ></FormControl>
                //     </Col>
                //     <Col md={2}>
                //       <Button
                //         variant='secondary'
                //         size='md'
                //         label='Reply'
                //         onClick={this.handleReplyToComment}
                //       ></Button>
                //     </Col>
                //   </Row>
                // </Form>
                null}
              </div>
            </div>
          ) : null}
        </div>

        <Modal show={confirmModal} onHide={this.openConfirmDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete this comment ?</Modal.Body>
          <Modal.Footer>
            <Button
              variant='warning'
              label='Yes'
              onClick={() => this.handleCommentDelete()}
            ></Button>
            <Button
              variant='transparent'
              label='No'
              onClick={this.openConfirmDialog}
              // style={{ padding: '10px' }}
            ></Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Comments;
