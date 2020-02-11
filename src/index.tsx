import { createBrowserHistory as createHistory } from 'history'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './index.css';


import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';


import * as reducers from './ducks';
import { loadUserInitialData } from './ducks/Users';

import { Router } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import services from './services/index';


const store = createStore(combineReducers({
  ...reducers,
  form: formReducer
}), compose(
  applyMiddleware(thunk.withExtraArgument(services))
));

const loadInitialData = () => store.dispatch(loadUserInitialData());

const history = createHistory();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <App loadInitialData={loadInitialData} history={history}/>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
