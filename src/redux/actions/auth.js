const requestLogin = (data) => {
  return {
    type: 'POST_LOGIN',
    payload: data
  }
}

export {
  requestLogin
};
