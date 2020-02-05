import * as React from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Login from './containers/auth/Login';

import Register from './containers/auth/Register';
import NewsFeed from './containers/NewsFeed';


import { Route } from 'react-router';

class App extends React.Component {
  public render() { 
    return (
      <div>
        <Route exact={true}  path="/" component={Login} />
        <Route exact={true}  path="/register" component={Register} />
        <Route path="/app" component={Navbar} />
        <Route exact={true}  path="/app/newsfeed" component={NewsFeed} />
      </div>
    );
  }
}

export default App;
