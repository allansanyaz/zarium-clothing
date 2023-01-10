import { combineReducers } from 'redux';
import userReducer from './user/user.slice';
import cartReducer from './cart/cart.slice';
import categoriesReducer from './categories/categories.slice';

// combine the reducers
export const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	categories: categoriesReducer,
});