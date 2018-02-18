import React, { Component } from 'react';
import firebase from '../firebase'

import Header from './Header';
import GroupLogin from './GroupLogin';
import GroupMain from './GroupMain';
import PageMenu from './PageMenu';

class GroupPage extends Component {
  state={
    groupId: 'tt',
    groupPw: '',
    user: null
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  _groupLogin = (e) =>{
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
  return (
    <div>
      <Header groupName="My Group"/>
      <PageMenu flipTitle="our flip list" voteTitle="our vote list"/>
      <GroupMain />
    </div>
   )
 }
}

const GroupIdChecking = Component => (props) => {
  return props.groupId ? <Component {...props}/> : <GroupLogin />
}

const GroupPageWithGroupIdChecking = GroupIdChecking(GroupPage);

export default GroupPageWithGroupIdChecking;