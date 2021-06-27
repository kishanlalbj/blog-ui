import React from 'react';
import ArticleCard from './ArticleCard';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'article/Card',
  component: ArticleCard
};

const Template = (args) => (
  <Router>
    <ArticleCard {...args}></ArticleCard>
  </Router>
);

export const Card = Template.bind({});

Card.args = {
  articleTitle: 'Blend mode interactions',
  articleSubtitle: 'Css new ways',
  articleCategory: 'Home',
  articleContent: '<p>Hello avanakam. This is a new way of declaring background images</p>',
  createdOn: "2021-01-20",
  onReadMore: () => console.log("Reading more") 
};
