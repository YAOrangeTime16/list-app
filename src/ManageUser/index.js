import React, { Component } from 'react';
import firebase from '../firebase';

import Admin from './Admin';
import Login from './Login';

class ManageUser extends Component {
  state = {
    user: null
  }

  componentDidMount(){
    this.checkUserLogin()
  }

  checkUserLogin = () => {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.setState({user})
      } else {
        return false
      }
    })
  }

  _logOut = () => {
    firebase.auth().signOut().catch(e=>console.log(e.message))
    this.setState({user: null})
	}

  render(){
    const { user, newUser } = this.state;
    return (
     this.state.user 
     ? <Admin logout={this._logOut} /> 
     : <Login 
        toggleUserType={this._topggleUserType} />
    )
  }
}

export default ManageUser;