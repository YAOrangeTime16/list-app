import React, {Component} from 'react'
import firebase from '../firebase'
import {
    Route
  } from 'react-router-dom';
import Button from '../ManageUser/Button';

class GroupLogin extends Component {
  state={
    groupId: '',
    groupPw: '',
    user: null
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  _anonymousLogin = (e) =>{
    e.preventDefault();
    const auth = firebase.auth();
    auth.signInAnonymously().catch(e=>console.log(e.message))
    auth.onAuthStateChanged(user => {
      this.setState({user})
      console.log(user);  
    })
  }

  _logout = () =>{
    const auth = firebase.auth();
    auth.signOut().then(()=>console.log('logged out')).catch(e=>console.log(e.message))
  }

  render(){
    const {groupId, groupPw, user} = this.state;
    return(
      <Route path='/grouplogin'>
        <form>
        <input id="gr-id" name="groupId" type="text" placeholder="Group ID" onChange={this._setValue} value={groupId} />
        <input id="gr-pw" name="groupPw" type="text" placeholder="Group Password" onChange={this._setValue} value={groupPw} />
        <Button clickAction={user ? this._logout : this._anonymousLogin} title={user ? "Sign Out" : "Login to Group"} />
        </form>
      </Route>
    )
  }
}

export default GroupLogin;