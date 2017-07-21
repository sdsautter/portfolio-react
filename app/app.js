import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import routes from './config/routes';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxPromise from 'redux-promise';

import Main from './components/Main';
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

render(<Main />, document.querySelector('#app'));
