import React from 'react';
import NewArticleCard from './NewArticleCard';

export default {
  title: 'Article',
  component: NewArticleCard
};

const Template = (args) => <NewArticleCard {...args}></NewArticleCard>;

export const NewCard = Template.bind({});

NewCard.args = {
  articleCover: 'pexels.jpg',
  articleTitle: 'New Card',
  articleSubtitle: 'Another subtitle',
  articleCategory: 'Life',
  articleContent: `<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>`,
  createdOn: '2021-01-20',
  totalComments: 3
};
