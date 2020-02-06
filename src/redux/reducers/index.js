import { combineReducers } from 'redux';

import { auth } from './auth';
import { products } from './products';
import { categories } from './categories';
import { users, roles } from './users';
import { cart } from './cart';

export default combineReducers({
  auth,
  products,
  categories,
  users,
  roles,
  cart
});
