import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';

const rootReducer = combineReducers({
  user: userReducer,
});

const initialState = {};

const middlewares = [
  thunk
];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

export default store;