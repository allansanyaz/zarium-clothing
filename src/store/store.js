import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from './user/user.slice';
import cartReducer from './cart/cart.slice';
import categoriesReducer from './categories/categories.slice';

// create the logger middleware
const loggerMiddleware = createLogger();
// create the store
export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		categories: categoriesReducer,
	},
	middleware: [thunkMiddleware, loggerMiddleware],
});