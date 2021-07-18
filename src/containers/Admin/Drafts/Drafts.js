import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../constants';
import { useHistory } from 'react-router-dom';

const Drafts = (props) => {
  const history = useHistory();
  const [drafts, setDrafts] = useState([]);

  const fetchDrafts = async (page = 1, limit = 10) => {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    };

    let response = await axios.get(
      `${API_BASE_URL}/articles/drafts?page=${page}&limit=${limit}`,
      {
        headers
      }
    );
    setDrafts(response.data.results);
  };

  useEffect(() => fetchDrafts(), []);

  return (
    <div>
      <Typography variant='h5'>Drafts</Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subtitle </TableCell>
              <TableCell>Categoty</TableCell>
              <TableCell>Created on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drafts.map((draft) => {
              return (
                <TableRow
                  key={draft._id}
                  hover
                  onClick={() =>
                    history.push(`/admin/articles/edit/${draft._id}`)
                  }
                >
                  <TableCell>{draft.articleTitle}</TableCell>
                  <TableCell>{draft.articleSubtitle} </TableCell>
                  <TableCell>{draft.articleCategory}</TableCell>
                  <TableCell>{moment(draft.createdOn).format('ll')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Drafts;
