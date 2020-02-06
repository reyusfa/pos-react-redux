const initialState = {
  item: [],
  order: [],
  totalOrder: 0
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_ACTION_ADD_ITEM':
      return {
        cart: [],
        order: [],
        totalOrder: 0
      }
    case 'CART_ACTION_REMOVE_ITEM':
      return {
        cart: [],
        order: [],
        totalOrder: 0
      }
    case 'CART_ACTION_ADD_QUANTITY_ITEM':
      return {
        cart: [],
        order: [],
        totalOrder: 0
      }
    case 'CART_ACTION_REDUCE_QUANTITY_ITEM':
      return {
        cart: [],
        order: [],
        totalOrder: 0
      }
    default:
      return state
  }
}

export {
  cart
};
