import { createStore } from 'redux';
import reducers from './reducers';
import * as Actions from './actions';

const store = createStore(reducers);

export { Actions, store };
