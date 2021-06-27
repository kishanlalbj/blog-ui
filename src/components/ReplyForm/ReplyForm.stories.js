import React from 'react';

import ReplyForm from './ReplyForm';

export default {
  title: 'Comments/ReplyForm',
  component: ReplyForm
};

const Template = (args) => <ReplyForm {...args}></ReplyForm>;

export const Form = Template.bind({});

Form.args = {
  replyText: '',
  onChangeHandler: () => {},
  handleReplyToComment: () => {}
};
