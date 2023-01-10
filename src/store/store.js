import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { rootReducer } from "./root-reducer";

import thunkMiddleware from 'redux-thunk';
// not that Sagas replace thunks and we only want one asynchronuous middleware
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";

// persistant reducers
import {
	persistReducer,
	persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// saga middleware
const sagaMiddleWare = createSagaMiddleware();

// create the logger middleware
const loggerMiddleware = createLogger();

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

// check to see if we are in production mode or development
const isProduction = process.env.NODE_ENV === 'production';
// create the store and add the middleware
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (!isProduction) ? [sagaMiddleWare, loggerMiddleware] : [sagaMiddleWare],
});

// run the saga middleware
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);