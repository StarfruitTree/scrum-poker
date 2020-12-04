import { combineReducers } from 'redux';
import roomData from './roomReducer';
import userData from './userReducer';

const rootReducer = combineReducers({ roomData, userData });

export default rootReducer;
