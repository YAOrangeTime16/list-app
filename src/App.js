import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import firebase from './firebase';

import GroupPage from './GroupPage';
import ManageUser from './ManageUser';

class App extends Component {
  state = {
    groupId: ''
  }

  _setGroupId = id => {
    this.setState({groupId: id})
    console.log(id)
  }

  render(){
    return (
      <section>
        <Switch>
          <Route exact path='/' render={()=><ManageUser setGroupId={this._setGroupId}/>}/>
          <Route path='/groups' render={()=><GroupPage groupId={this.state.groupId}/>}/>
        </Switch>
      </section>
    )
  }
}

export default App;
