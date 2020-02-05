import React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { useInput } from '../hooks/useInput';

import axios from 'axios';
import qs from 'qs';

const Login = () => {
  const history = useHistory();
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

  const data = {
    username,
    password
  };

  const setDataLogin = (payload) => dispatch({
    type: 'POST_LOGIN_REQUEST',
    payload
  });

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const body = qs.stringify(data);
    await axios.post(`${process.env.REACT_APP_API_HOST}/login`, body)
    .then(({ data }) => {
      setDataLogin(data.data);
      history.push('/');
    });

    resetUsername();
    resetPassword();
  }

  return (
    <div>
      <div>{auth.data.token}</div>
      <form onSubmit={handleSubmitLogin}>
        <input
          type="text"
          {...bindUsername}
        />
        <input
          type="password"
          {...bindPassword}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
