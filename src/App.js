import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import firebase from './firebase';

import ManageGroup from './ManageGroup';
import GroupPage from './ManageGroup/GroupPage';
import ManageUser from './ManageUser';

class App extends Component {
  state = {
    user: false,
    loggedInAs: '',
    userInfo: '',
    groupId:''
  }
  //---- ComponentDidMount -----------
  _checkUserLogin = () => {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this._getThisUsersInfo(user.uid)
        this.setState({user: true})
        if(user.isAnonymous){
          this.setState({loggedInAs: 'anonymous'})
        } else {
          this.setState({loggedInAs: 'admin'})
        }
      }
      return false
    })
    return false
  }

  _setUserState = user => {
    this.setState({user})
  }

  _getThisUsersInfo = userid => {
    if(userid){
      firebase.database().ref(`/users/${userid}`).on('value', info=>
        this.setState({userInfo: info.val()})
      )
    }
  }
  
  componentDidMount(){
    this._checkUserLogin()
  }
  //-------------------------------------

_logout = () =>{
  const auth = firebase.auth();
  auth.signOut()
  .then(()=>{
    this.setState( {user: null, userInfo: ''} )
  })
  .catch(e=>console.log(e.message))
}

  render(){
    const {groupId, user} = this.state;
    return (
      <section>
        <Switch>
          <Route exact path='/' render={()=><ManageGroup {...this.state} setUserState={this._setStateOfUser}/>} />
          <Route path='/groups/:id' component={GroupPage} />
          <Route path='/admin' render={()=><ManageUser {...this.state} logout={this._logout}/>} />
        </Switch>
      </section>
    )
  }
}

const Home = () => <div>Home</div>

export default App;
