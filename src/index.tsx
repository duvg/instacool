import { createBrowserHistory as createHistory } from 'history'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './index.css';

import { Router } from 'react-router';
import registerServiceWorker from './registerServiceWorker';


const history = createHistory();
ReactDOM.render(
  <Router history={history} >
    <App />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
