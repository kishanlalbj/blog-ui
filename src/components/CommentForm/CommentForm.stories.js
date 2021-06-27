import React from 'react';
import CommentForm from './CommentForm';

export default {
  title: 'Comments/Form',
  component: CommentForm
};

const Template = (args) => <CommentForm {...args}></CommentForm>;

export const Form = Template.bind({});

Form.args = {
  user: {
    avatar: 'https://via.placeholder.com/150'
  },
  commentText: 'SOme comment',
  onChangeHandler: () => {},
  onPostComment: () => {}
};
