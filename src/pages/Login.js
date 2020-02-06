import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { useInput } from '../hooks/useInput';

import axios from 'axios';
import qs from 'qs';

import { SemanticToastContainer } from 'react-semantic-toasts';
import { toasting } from '../helper';

import {
  Button,
  Card,
  Form,
  Input
} from 'semantic-ui-react';

import {
  LoginPage,
  Logo,
  Toast
} from '../components/Layout';

const Login = () => {
  const history = useHistory();
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

      resetUsername();
      resetPassword();
    }).catch(error => {
      if(error.response) {
        const { message } = error.response.data.error;
        toasting('Login Failed!', message, 'error');
      }
    });
  }

  return (
    <LoginPage>
      <Logo>Tumbas Jus</Logo>
      <Card centered>
        <Card.Content>
          <Card.Header textAlign="center">Login</Card.Header>
        </Card.Content>
        <Card.Content>
          <Form onSubmit={handleSubmitLogin}>
            <Form.Field
              control={Input}
              placeholder="Username"
              {...bindUsername}
            />
            <Form.Field
              control={Input}
              placeholder="Password"
              type="password"
              {...bindPassword}
            />
            <Form.Field
              primary
              control={Button}
              type="submit"
              content="Login"
            />
          </Form>
        </Card.Content>
      </Card>
      <Toast><SemanticToastContainer /></Toast>
    </LoginPage>
  );
};

export default Login;
