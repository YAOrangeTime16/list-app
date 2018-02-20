import React, { Component } from 'react';
import firebase from '../firebase';
import './style.css';

import Header from './GroupHeader';
import GroupLogin from './GroupLogin';
import GroupMain from './GroupMain';

export default class GroupPage extends Component {
  state = {
    loggedInAs: '',
    groupId: '',
    groupName: '',
    flipList: [],
    groupIsOwnedBy: '',
    page: 'flip'
  }
  _checkIfUserIsLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user=>{
      if(user.isAnonymous){
        this.setState({loggedInAs: 'anonymous'})
      } else {
        this._checkIfAdminOwnThisGroup(user.uid)
      }
    })
  }

  _checkIfAdminOwnThisGroup = uid => {
    const usersGroups = firebase.database().ref(`users/${uid}/myGroups`);
    usersGroups.on('child_added', snap=>{
      if(this.props.match.params.id === snap.val().groupId){
        this.setState({loggedInAs: 'admin'})
      } else {
        this.setState({loggedInAs: 'adminOfAnotherGroup'})            
      }
    })
  }

  _getGroupInfo = groupid => {
    const groupRef = firebase.database().ref('/groups').child(groupid);
    groupRef.once('value', snap => 
    this.setState({
      groupId: snap.key, 
      groupName: snap.val().groupName,
      groupIsOwnedBy: snap.val().uid,
      flipList: snap.val().flipList || ''
    }))
  }

  _getGroupList = () => {
    const refToGroup = this.props.match.url
    const listRef = firebase.database().ref(`${refToGroup}/flipList`)
    listRef.on('child_added', snap=>this.setState({flipList: [...this.state.flipList, snap.val()]}))
  }

  componentDidMount(){
    this._checkIfUserIsLoggedIn()
    this._getGroupInfo(this.props.match.params.id)
    this._getGroupList()
  }

  _logout = () =>{
    const auth = firebase.auth();
    auth.signOut().then(()=>console.log('logged out')).catch(e=>console.log(e.message))
  }
  
 render(){
   const {groupId, groupName, flipList, page} = this.state;
  return (
    <div>
      <Header groupName={groupName}/>
      <GroupMain
        {...this.props}
        flipTitle="our flip list"
        voteTitle="our vote list"
        page={page}
        groupId={groupId}
        flipList={flipList} />
    </div>
   )
 }
}

const userChecking = Component => (props) => {
  return props.uid ? <Component {...props}/> : <GroupLogin />
}
const GroupPageWithUserChecking = userChecking(GroupPage);
