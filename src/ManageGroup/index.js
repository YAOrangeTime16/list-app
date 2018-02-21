import React, { Component } from 'react';
import firebase from '../firebase';
import bcrypt from 'bcryptjs';
import {Redirect, Route, Switch} from 'react-router-dom';
import './style.css';
import GroupPage from './GroupPage';
import GroupLogin from './GroupLogin';

export default class ManageGroup extends Component {
  state = {
    loggedInAs: '',
    groupId: '',
    authGroupId: '',
    authGroupPw: '',
    groupPw: '',
    groupName: '',
    flipList: [],
    groupIsOwnedBy: '',
    user: '',
    page: 'flip'
  }

  _setValue = e =>{
    this.setState({[e.target.name]: e.target.value})
  }

  _anonymousLogin = () =>{
    const {authGroupId, authGroupPw} = this.state;
    //const {setUserState} = this.props;
    //e.preventDefault();
    const groupRef = firebase.database().ref('/groups').child(authGroupId)
    const auth = firebase.auth();

    groupRef.on('value', snap=>{
      if(snap.val() !==null){
        const hash = snap.val().groupPass;
        const passOk = bcrypt.compareSync(authGroupPw, hash);
        if(passOk){
          auth.signInAnonymously().catch(e=>console.log(e.message))
          //auth.onAuthStateChanged(user => this.setState({user}))
          this._getGroupInfo(authGroupId)
        } else {
          this.setState({error: 'Group Password is wrong'})
        }
      } else {
      this.setState({error: 'There is no matching Group ID'})
    }
  })
}
/*
  _checkIfUserIsLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user=>{
      if(user.isAnonymous){
        this.setState({loggedInAs: 'anonymous'})
      } else {
        this._checkIfAdminOwnThisGroup(user.uid)
      }
    })
  }
  */
 
  _checkIfAdminOwnThisGroup = uid => {
    const usersGroups = firebase.database().ref(`users/${uid}/myGroups`);
    usersGroups.on('child_added', snap=>{
      if(this.state.authGroupId === snap.val().groupId){
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
    //this._checkIfUserIsLoggedIn()
  }

  _logoutFromGroup = () =>{
    const auth = firebase.auth();
    auth.signOut().catch(e=>console.log(e.message))
    this.setState({groupId: '', loggedInAs: '', groupName: ''})
  }
  
 render(){
   const {error, groupId, groupName, flipList, page} = this.state;
  return (
    <div>
      { groupId
          ? <Redirect to={`/groups/${groupId}`} />
          : <GroupLogin anonymousLogin={this._anonymousLogin} setValue={this._setValue} error={error}/> 
      }
    </div>
    )
  }
}