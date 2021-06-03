import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <nav data-test='main-header'>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Scribbles
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            className='justify-content-end'
            id='responsive-navbar-nav'
          >
            <Nav>
              <NavDropdown
                alignRight
                title={
                  <img
                    src={user?.avatar}
                    width='30'
                    height='30'
                    style={{ borderRadius: '99px' }}
                    alt='avatar'
                  ></img>
                }
                id='collasible-nav-dropdown'
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Drafts</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default Header;
