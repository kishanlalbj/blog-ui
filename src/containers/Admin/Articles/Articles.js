import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleTable from '../../../components/ArticleTable/ArticleTable';
import { API_BASE_URL } from '../../../constants';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const fetchArticles = (page, limit = 10) => {
    axios
      .get(`${API_BASE_URL}/articles?page=${page}&limit=${limit}`)
      .then((res) => setArticles(res.data.results))
      .catch((err) => console.log(err));
  };

  const memoizedFetchArticles = React.useCallback(
    (page) => fetchArticles(page),
    []
  );

  const onPageChange = (page, limit = 10) => {
    setPage((page) => page + 1);
    fetchArticles(page, limit);
  };

  useEffect(() => {
    memoizedFetchArticles(page);
  }, [memoizedFetchArticles, page]);

  return (
    <div>
      <div className='articles-container'>
        <Typography variant='h5'>Articles</Typography>

        <Link to='/admin/articles/new'>
          <Button variant='contained' color='primary'>
            New
          </Button>
        </Link>
      </div>
      <div>
        <ArticleTable
          articles={articles}
          rowsPerPage={10}
          page={page}
          onPageChange={onPageChange}
        ></ArticleTable>
      </div>
    </div>
  );
};

export default Articles;
