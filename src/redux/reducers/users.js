const initialState = {
  data: [],
  isLoading: false,
  pagination: {}
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_PENDING':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_USERS_REJECTED':
      return {
        ...state,
        isLoading: false
      }
    case 'GET_USERS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pagination: action.payload.data.pagination
      }
    default:
      return state
  }
}

const roles = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROLES_PENDING':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_ROLES_REJECTED':
      return {
        ...state,
        isLoading: false
      }
    case 'GET_ROLES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pagination: action.payload.data.pagination
      }
    default:
      return state
  }
}

export {
  users,
  roles
};
