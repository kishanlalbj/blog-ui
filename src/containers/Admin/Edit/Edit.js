import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../constants';
import ArticleBuilder from '../../ArticleBuilder/ArticleBuilder';

const Edit = (props) => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  const fetchArticle = async () => {
    let resp = await axios.get(`${API_BASE_URL}/articles/${id}`);
    setArticle(resp.data);
  };

  useEffect(() => fetchArticle(), []);

  return (
    <div>
      <ArticleBuilder mode={'edit'} article={article}></ArticleBuilder>
    </div>
  );
};

export default Edit;
