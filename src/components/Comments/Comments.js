import React, { Component } from 'react';

class Comments extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div data-test='comment-section'>
        <div
          key={comment.id}
          style={{
            margin: '15px 0px',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: 'rgb(240 242 245)'
          }}
        >
          <h6>{comment.commenterName}</h6>
          <p>{comment.commentText}</p>
          <span>
            {comment.replies.length > 0 ? (
              <p
                data-test='replies'
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'inline'
                }}
              >
                {comment.replies.length} Replies
              </p>
            ) : null}
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              marginLeft: '20px'
            }}
          >
            Reply
          </span>
        </div>
      </div>
    );
  }
}

export default Comments;
