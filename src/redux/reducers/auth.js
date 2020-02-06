const initialState = {
  data: [],
  isLoading: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_LOGIN_REQUEST':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case 'LOGOUT_REQUEST':
      return {
        data: []
      }
    default:
      return state
  }
}

export {
  auth
};
