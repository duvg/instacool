import * as React from 'react';
import './App.css';

import { History } from 'history';

import Navbar from './components/layout/Navbar';
import Login from './containers/auth/Login';

import Register from './containers/auth/Register';
import NewsFeed from './containers/NewsFeed';
import Profile from './containers/Profile';

import { Route } from 'react-router';
import services from './services';

interface IAppProps {
  history: History
}

class App extends React.Component<IAppProps> {

  public state = {
    loading: true,
  }


  public componentDidMount() {
    const { auth } = services;

    auth.onAuthStateChanged(user => {
      
      if (user) {
        if (['/', '/register'].indexOf(location.pathname) > -1 ) {
          const { history } = this.props;
          history.push('/app/newsfeed');
        } 
      } else {
        // /app/*
        if (/\app\/./.test(location.pathname)) {
          const { history } = this.props;
          history.push('/');
        }
      }

      this.setState({
        loading: false
      });

    });
  }

  public render() { 
    const { loading } = this.state;
    return (
      loading ? 'Loading...' :
      <div>
        <Route exact={true}  path="/" component={Login} />
        <Route exact={true}  path="/register" component={Register} />
        <Route path="/app" component={Navbar} />
        <Route exact={true}  path="/app/newsfeed" component={NewsFeed} />
        <Route exact={true}  path="/app/profile" component={Profile} />
      </div>
    );
  }
}

export default App;
