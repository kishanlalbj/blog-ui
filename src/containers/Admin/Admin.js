import axios from 'axios';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth/authActions';
import Header from '../../components/Header/Header';
import { API_BASE_URL } from '../../constants';

const Admin = (props) => {
  const getDashboardData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
    };
    let resp = await axios.get(`${API_BASE_URL}/admin/dashboard`, config);
    return resp.data;
  };

  useEffect(() => {
    getDashboardData().then((data) => {
      console.log(data);
    });
  }, []);

  const { user, logout } = props;
  return (
    <div>
      <Header user={user} onLogout={logout}></Header>

      <Container>
        <h1>Admin</h1>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
