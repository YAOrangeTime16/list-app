import React, {Component} from 'react'
import firebase from '../firebase';
import bcrypt from 'bcryptjs';
import {
  Link,
  Route,
  Redirect
} from 'react-router-dom';
import Button from '../General/Button';
import GroupPage from './index';
import Login from '../ManageUser/Login';
import ManageUser from '../ManageUser';

class GroupLogin extends Component {
  state={
    groupId: '',
    groupPw: '',
    user: null,
    error: ''
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  
/*
  _logout = () =>{
    const auth = firebase.auth();
    auth.signOut().then(()=>console.log('logged out')).catch(e=>console.log(e.message))
  }
*/
  render(){
    const {error, user} = this.state;
    const {anonymousLogin, setValue, groupId, groupPw} = this.props;
    return (
      <div>
          <Link to='/admin'>Are youAdmin?</Link>
          <form onSubmit={e=>e.preventDefault()}>
            <input id="gr-id" name="authGroupId" type="text" placeholder="Group ID" onChange={setValue} value={groupId} />
            <input id="gr-pw" name="authGroupPw" type="text" placeholder="Group Password" onChange={setValue} value={groupPw} />
            <Button clickAction={anonymousLogin} title="log" />
          </form>
          <div>{error}</div>
      </div>
    )   
  }
}

export default GroupLogin;