import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import firebase from './firebase';

import GroupPage from './GroupPage';
import GroupLogin from './GroupPage/GroupLogin';
import ManageUser from './ManageUser';

class App extends Component {
  state = {
    user: null,
    userInfo: ''
  }
  //---- ComponentDidMount -----------
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
  //-------------------------------------
/*
  _setGroupId = (id, userId) => {
    this.setState({groupId: id, uid: userId})
    console.log(id + ' ' + userId)
  }
*/
  

  render(){
    return (
      <section>
        <Switch>
          <Route exact path='/' render={props=><GroupLogin {...props}  /*setGroupId={this._setGroupId}*/ />}/>
          <Route path='/admin' render={props=><ManageUser {...props} {...this.state}/> } />
          <Route path='/groups/:id' render={props=><GroupPage {...props}  /> } />
        </Switch>
      </section>
    )
  }
}
export default App;
