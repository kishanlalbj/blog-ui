import React from 'react';
import './Helmet.scss';
import { Navbar } from 'react-bootstrap';

const Helmet = () => (
  <div>
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>React Bootstrap</Navbar.Brand>
    </Navbar>
  </div>
);

export default Helmet;
