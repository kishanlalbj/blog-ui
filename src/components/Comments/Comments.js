import React, { Component } from 'react';
import './Comments.scss';
class Comments extends Component {
  state = {
    isOpen: false
  };

  openReplies = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { comment } = this.props;
    const { isOpen } = this.state;

    return (
      <div data-test='comment-section'>
        <div key={comment.id} className='comments-container'>
          <h6>{comment.commenterName}</h6>
          <p>{comment.commentText}</p>
          <span>
            {comment.replies.length > 0 ? (
              <p
                onClick={this.openReplies}
                data-test='replies'
                className='comments-footer'
              >
                {comment.replies.length} Replies
              </p>
            ) : (
              <p className='comments-footer'>Reply</p>
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
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Comments;
