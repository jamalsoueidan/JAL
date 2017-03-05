import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import createLogger from 'redux-logger';
import router from './router'

const createStoreWithMiddleware = applyMiddleware(router5Middleware(router))(createStore);
const store = createStoreWithMiddleware(combineReducers({router: router5Reducer}));

window.store = store;

export default store;
