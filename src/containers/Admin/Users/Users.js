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

const Users = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    };

    let response = await axios.get(`${API_BASE_URL}/users`, { headers });
    setUsers(response.data);
  };

  useEffect(() => fetchUsers(), []);

  return (
    <div>
      <Typography variant='h5'>Users</Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName} </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{moment(user.createdOn).format('ll')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
