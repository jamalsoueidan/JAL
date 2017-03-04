import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

const reducer = (state = false, action) => {
  if(action.type == "add") {
    return [action.text]
  }
  return state;
}

export default createStore(combineReducers({user: reducer}), applyMiddleware(createLogger()));
