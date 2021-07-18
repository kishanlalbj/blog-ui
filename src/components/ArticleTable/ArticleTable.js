import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import moment from 'moment';

const ArticleTable = (props) => {
  const { articles, page, rowsPerPage, onPageChange } = props;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subtitle</TableCell>
              <TableCell>Created On</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <TableRow
                  hover
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => alert(article._id)}
                >
                  <TableCell>{article.articleTitle}</TableCell>
                  <TableCell>{article.articleSubtitle}</TableCell>
                  <TableCell>
                    {moment(article.createdOn).format('ll')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  No articles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ArticleTable;
