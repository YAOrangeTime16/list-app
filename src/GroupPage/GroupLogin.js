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

  _anonymousLogin = (e) =>{
    const {groupPw, groupId} = this.state;
    e.preventDefault();
    const groupRef = firebase.database().ref('/groups').child(groupId)
    const auth = firebase.auth();

    groupRef.on('value', snap=>{
      if(snap.val() !==null){
        const hash = snap.val().groupPass;
        const passOk = bcrypt.compareSync(groupPw, hash);
        if(passOk){
          auth.signInAnonymously().catch(e=>console.log(e.message))
          auth.onAuthStateChanged(user => {
            this.setState({user})
            //getGroupInfo(groupId)
          })
        } else {
          this.setState({error: 'Group Password is wrong'})
        }
      } else {
      this.setState({error: 'There is no matching Group ID'})
    }
  })
}

  _logout = () =>{
    const auth = firebase.auth();
    auth.signOut().then(()=>console.log('logged out')).catch(e=>console.log(e.message))
  }

  render(){
    const {error, groupId, groupPw, user} = this.state;
    return (
      user ? <Redirect to={{pathname: `/groups/${groupId}`}} render={props=><GroupPage {...props} uid={user.uid} />} />
      : <div>
          <Link to='/admin'>Are youAdmin?</Link>
          <form>
            <input id="gr-id" name="groupId" type="text" placeholder="Group ID" onChange={this._setValue} value={groupId} />
            <input id="gr-pw" name="groupPw" type="text" placeholder="Group Password" onChange={this._setValue} value={groupPw} />
            <Button clickAction={this._anonymousLogin} title="Login to Group" />
          </form>
          <div>{error}</div>
          <Route path='/admin' component={ManageUser} />
        </div>
    )   
  }
}

export default GroupLogin;