import { combineReducers } from 'redux';
import products from './productSlice';
import users from './userSlice';

export default combineReducers({
  products,
  users,
});
