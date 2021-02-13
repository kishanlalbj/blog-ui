import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Header.scss';

const Header = () => {
  return (
    <nav data-test='main-header'>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Scribbles</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            className='justify-content-end'
            id='responsive-navbar-nav'
          >
            <Nav>
              <NavDropdown
                alignRight
                title='Profile'
                id='collasible-nav-dropdown'
              >
                <NavDropdown.Item href='#action/3.2'>
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Profile</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.4'>Drafts</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.5'>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default Header;
