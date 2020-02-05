const initialState = {
  data: [],
  isLoading: false,
  pagination: {}
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true
      }
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false
      }
    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pagination: action.payload.data.pagination
      }
    case 'POST_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true
      }
    case 'POST_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false
      }
    case 'POST_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    default:
      return state
  }
}

export {
  products
};
