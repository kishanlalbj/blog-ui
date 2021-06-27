import React from 'react';
import { Avatar, IconButton, TextField } from '@material-ui/core';
import { Reply } from '@material-ui/icons';
import './ReplyForm.css';

const ReplyForm = (props) => {
  const { user, replyText, onChangeHandler, handleReplyToComment } = props;
  return (
    <div className='reply-form-container'>
      <div className='reply-avatar'>
        <Avatar src={user?.avatar} imgProps={{ draggable: false }}></Avatar>
      </div>
      <div>
        <TextField
          label='Reply'
          variant='outlined'
          value={replyText}
          size='small'
          style={{ width: '500px' }}
          onChange={onChangeHandler}
          name='replyText'
        ></TextField>
      </div>
      <div>
        <IconButton
          color='inherit'
          size='medium'
          onClick={handleReplyToComment}
        >
          <Reply></Reply>
        </IconButton>
      </div>
    </div>
  );
};

export default ReplyForm;
