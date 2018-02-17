import React, { Component } from 'react';
import firebase from '../firebase';

import Admin from './Admin';
import Login from './Login';

class ManageUser extends Component {
  state = {
    user: null,
    userInfo: ''
  }

  _checkUserLogin = () => {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.setState({user})
        this._getThisUsersInfo()
      } else {
        return false
      }
    })
  }

  _getThisUsersInfo = () => {
		const {user} = this.state;
		firebase.database().ref(`/users/${user.uid}`).on('value', user=>{	
			this.setState({userInfo: user.val()})
		})
	}
  
  componentDidMount(){
    this._checkUserLogin()
  }

  _logOut = () => {
    firebase.auth().signOut().catch(e=>console.log(e.message))
    this.setState({user: null})
  }

  render(){
    const { user, userInfo } = this.state;
    return (
     this.state.user 
     ? <Admin logout={this._logOut} userId={user.uid} userInfo={userInfo}/> 
     : <Login 
        toggleUserType={this._topggleUserType} />
    )
  }
}

export default ManageUser;