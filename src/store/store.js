import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import rideReducer from './reducers/ride';
import onlineDriversReducer from './reducers/online-drivers';
import notificationsReducer from './reducers/notifications';

const rootReducer = combineReducers({
  user: userReducer,
  ride: rideReducer,
  onlineDrivers: onlineDriversReducer,
  notifications: notificationsReducer
});

const initialState = {};

const middlewares = [
  thunk
];

// __DEV__ ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;