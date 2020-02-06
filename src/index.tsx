import { createBrowserHistory as createHistory } from 'history'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './index.css';

import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './ducks';

import { Router } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import services from './services/index';


const store = createStore(combineReducers({
  ...reducers,
}), compose(
  applyMiddleware(thunk.withExtraArgument(services)),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
));


const history = createHistory();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
