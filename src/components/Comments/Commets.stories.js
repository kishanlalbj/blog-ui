import React from 'react';
import Comments from './Comments';

export default {
  title: 'Comments/Card',
  component: Comments
};

const Template = (args) => <Comments {...args}></Comments>;

export const WithoutReplies = Template.bind({});

WithoutReplies.args = {
  isAuthenticated: false,

  comment: {
    commenterName: 'Kishanlal',
    commentText: 'This is a comment',
    replies: []
  }
};

export const WithoutRepliesAdmin = Template.bind({});

WithoutRepliesAdmin.args = {
  isAuthenticated: true,
  isAdmin: true,
  user: {
    avatar: 'https://via.placeholder.com/150'
  },
  comment: {
    commenterName: 'Kishanlal',
    commentText: 'This is a comment',
    replies: []
  }
};

export const WithReplies = Template.bind({});

WithReplies.args = {
  comment: {
    commenterName: 'Kishanlal',
    commentText: 'This is a comment',
    replies: [
      {
        name: 'Joseph Kuruvilla',
        text: 'Enga poganum nu therila.. '
      },
      {
        name: 'Mithra',
        text: 'Bayangaram boss'
      },
      {
        name: 'Kishanlal',
        text: 'Ennada nadakuthu inga ?'
      }
    ]
  }
};
