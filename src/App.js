import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Group from './GroupPage';

import {createUrl} from './helperFunctions';

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const About = () => (
  <div>
    <h1>About</h1>
  </div>
  )

//let groupsUrl = createUrl();
const App = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to={`/group`}>Group Page</Link>
      <hr />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path={`/group`} component={Group} />
      </Switch>
    </div>
  )
};

export default App;
