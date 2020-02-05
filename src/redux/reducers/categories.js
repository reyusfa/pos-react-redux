const initialState = {
  data: [],
  isLoading: false
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_PENDING':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_CATEGORIES_REJECTED':
      return {
        ...state,
        isLoading: false
      }
    case 'GET_CATEGORIES_FULFILLED':
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
  categories
};
