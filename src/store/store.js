import { configureStore } from '@reduxjs/toolkit';
import { compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import userReducer from './user/user.slice';
import cartReducer from './cart/cart.slice';
import categoriesReducer from './categories/categories.slice';

// persistant reducers
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// create the logger middleware
const loggerMiddleware = createLogger();

// combine the reducers
const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	categories: categoriesReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
}

const isProduction = process.env.NODE_ENV === 'production';

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create the store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (!isProduction) ? [thunkMiddleware, loggerMiddleware] : [thunkMiddleware],
});

export const persistor = persistStore(store);