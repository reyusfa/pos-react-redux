import axios from 'axios';
import qs from 'qs';

const requestUsers = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  }
  return {
    type: 'GET_USERS',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/users`, config)
  }
};

const requestRoles = ({ headers, params }) => {
  const config = {
    headers,
    params,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  }
  return {
    type: 'GET_ROLES',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/users/roles`, config)
  }
};

export {
  requestUsers,
  requestRoles
};
