import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom';
import firebase from './firebase';

import ManageUser from './ManageUser';

class App extends Component {

  render(){
    return (
      <section>
        <ManageUser />
      </section>
    )
  }
}

export default App;
