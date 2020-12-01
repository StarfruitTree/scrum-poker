import { createStore } from 'redux';
import reducers from './reducers';
import * as Actions from './actions';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export { Actions, store };
