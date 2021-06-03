import { types } from '../types';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import jwt_decode from 'jwt-decode';

export const googleLogin = (tokenId) => async (dispatch) => {
  let resp = await axios.post(`${API_BASE_URL}/auth/google/login`, { tokenId });

  const { token } = resp.data;
  localStorage.setItem('jwtToken', token);
  const decoded = jwt_decode(token);

  return dispatch({
    type: types.LOGIN_SUCCESS,
    payload: decoded
  });
};

export const setCurrentUser = (decoded) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: decoded
  };
};

//logout user
export const logoutUser = (history) => (dispatch) => {
  console.log('Hello');
  localStorage.removeItem('jwtToken');
  // history.push("/");
  window.location.href = '/';

  dispatch({
    type: types.LOGOUT_USER,
    payload: false
  });
};
