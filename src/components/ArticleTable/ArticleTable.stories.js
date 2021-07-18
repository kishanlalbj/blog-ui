import React from 'react';
import ArticleTable from './ArticleTable';

export default {
  title: 'Articles/Table',
  component: ArticleTable
};

const Template = (args) => <ArticleTable {...args}></ArticleTable>;

export const TableWithNoData = Template.bind({});

TableWithNoData.args = {
  articles: []
};

export const TableWithData = Template.bind({});

TableWithData.args = {
  articles: [
    { _id: '1', articleTitle: 'New Post', articleSubtitle: 'New' },
    {
      _id: '2',
      articleTitle: 'Another New Post',
      articleSubtitle: 'Another New'
    }
  ]
};
