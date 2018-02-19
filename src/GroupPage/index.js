import React, { Component } from 'react';
import firebase from '../firebase';
import './style.css';

import Header from './Header';
import GroupLogin from './GroupLogin';
import GroupMain from './GroupMain';
import PageMenu from './PageMenu';

export default class GroupPage extends Component {

  _logout = () =>{
    const auth = firebase.auth();
    auth.signOut().then(()=>console.log('logged out')).catch(e=>console.log(e.message))
  }
  
 render(){
   const {groupName} = this.props;
   console.log('goupPage: ' + this.props.match.params.id)
  return (
    <div>
      <Header groupName={groupName}/>
      <PageMenu flipTitle="our flip list" voteTitle="our vote list"/>
      <GroupMain />
    </div>
   )
 }
}

const userChecking = Component => (props) => {
  return props.uid ? <Component {...props}/> : <GroupLogin />
}
const GroupPageWithUserChecking = userChecking(GroupPage);

GroupPageWithUserChecking;