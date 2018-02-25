import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import firebase from './firebase';
import bcrypt from 'bcryptjs';
import './App.css';

import ManageGroup from './ManageGroup';
import GroupPage from './ManageGroup/GroupPage';
import ManageUser from './ManageUser';

class App extends Component {
  state = {
    loggedinAsAdmin: false,
    loggedinAsMember: false,
    userBelongsToThisGroupAs: '',
    error: '',
    uid: '',
    userName: '',
    groups: [],
    groupId: '',
    listFlipID: '',
    listVoteID: ''
  }

  //---- ComponentDidMount -----------

  _checkUserLoggedInAs = ()=> {
    const auth = firebase.auth()
    auth.onAuthStateChanged(user=>{
      if(user){
        if(user.isAnonymous){
          return this.setState({userBelongsToThisGroupAs: 'member'})
        } else {
          this._getGroupIdsOfThisAdmin(user.uid)
          return this.setState({
            userBelongsToThisGroupAs: 'admin',
            loggedinAsAdmin: true,
            loggedinAsMember: false,
            uid: user.uid,
            userName: user.displayName || user.email })
        }
      }
      return false
    })
  }

  _getGroupIdsOfThisAdmin = uid => {
		const groupsRef = firebase.database().ref(`/users/${uid}/myGroups`)
		groupsRef.on('value', snap => this.setState({groups: snap.val()}))
  }
  

  componentDidMount(){
    this._checkUserLoggedInAs()
    this.setState({error: ''})
  }
  //-------------------------------------

  _addGroup = (name, pw) => {
		const { uid, groups } = this.state;
    if (!name || !pw){
      this.setState({error: 'please fill in'})
    } else {
      const hash = bcrypt.hashSync(pw, 10);
      const groupObject = {
        groupName: name,
        groupPass: hash,
        uid: uid,
        listFlipID: '',
        listVoteID: ''
      }
    //save to state??: groupObject check wifi connection

		firebase.database().ref(`/groups`).push(groupObject)
		.then(group=>{
			//set groups url to the group object
			firebase.database().ref(`/groups`).child(`/${group.key}`).update({groupUrl: group.key})
			//set groups id under the user info
			const userRef = firebase.database().ref(`/users/${uid}`);
			if(groups){
				const updatedGroups = [...groups, {groupName: name, groupId: group.key}];
				//const updatedUserInfo = Object.assign(userInfo, {myGroups: updatedGroups} )
        userRef.update({myGroups: updatedGroups})
        //this.setState({groups: updatedGroups})
			} else {
        userRef.update({myGroups: [{groupName: name, groupId: group.key}]})
        //this.setState({groups: [{groupName: name, groupId: group.key}]})
			}
    })
    }
  }
  
  _addList = (groupID, name, text, item1, item2, type) => {
    const {uid, groups} = this.state
    const listObject = {
      label: name,
      description: text,
      items: [
        {name: item1, status: false, id: groupID + 'i1'},
        {name: item2, status: false, id: groupID + 'i2'}],
      groupId: groupID
    }
    //save to state?? listObject -check wifi connection

    if(type==='flip'){
      firebase.database().ref(`/flipLists`).push(listObject)
      .then(list=>{
        firebase.database().ref(`/groups/${groupID}`).update({listFlipID: list.key})
        this.setState({listFlipID: list.key})
      })
      .catch(e=>console.log(e.message))
    } else if(type==='vote'){
      firebase.database().ref(`/voteLists`).push(listObject)
		.then(list=>{
      firebase.database().ref(`/groups/${groupID}`).update({listVoteID: list.key})
      this.setState({listVoteID: list.key})
    })
    .catch(e=>console.log(e.message))
    }
    
  }

  _getGroupId = (id) => {
    this.setState({groupId: id})
  }

  _loginGroup = (password, groupID) => {
    if(!password || !groupID) {
      this.setState({error: 'Please fill in'})
    } else {
      const groupRef = firebase.database().ref(`/groups/${groupID}`);
      groupRef.once('value', group => {
        if(group.val() === null){
          this.setState({error: 'There is no such a group'})
          return false
        } else {
          const hash = group.val().groupPass;
          const passOK = bcrypt.compareSync(password, hash)
          if(!passOK){
            this.setState({error: 'Password is wrong'}) 
          } else {
            firebase.auth().signInAnonymously().catch(e=>this.setState({error: e.message}))
            this.setState({loggedinAsMember: true, userBelongsToThisGroupAs: 'member', groupId: groupID, error: ''})
          } 
        }
      })
    }

  }
  
  _logoutAdmin = (cb) => {
    firebase.auth().signOut()
    .then(()=>{
      this.setState({
        loggedinAsAdmin: false,
        loggedinAsMember: false,
        userBelongsToThisGroupAs: '',
        groups: [],
        groupId: '',
        userName: '',
        uid: ''})
      cb()
    })
    .catch(e=>this.setState({error: e.message}))
  }

  _logoutGroup = (cb) =>{
    firebase.auth().signOut()
    this.setState({
      groups: [],
      loggedinAsAdmin: '',
      loggedinAsMember: '',
      userBelongsToThisGroupAs: '',
      uid: '',
      userName: '',
      groupId: ''})
    cb()
  }

  render(){
    return (
      <section>
        <Switch>
          <Route exact path='/' 
            render={()=>
              <ManageGroup {...this.state} 
                loginGroup={this._loginGroup}
                error={this.state.error}/>
            }
          />
          <Route path='/groups/:id'
            render={(props)=>
              <GroupPage {...this.state} {...props}
                logoutGroup={this._logoutGroup}
                addList={this._addList} />
            }
          />
          <Route path='/admin'
            render={(props)=>
              <ManageUser {...props} {...this.state}
                logoutAdmin={this._logoutAdmin}
                singupAdmin={this._signupAdmin}
                addGroup={this._addGroup}
                getGroupId={this._getGroupId} />
            }
          />
        </Switch>
      </section>
    )
  }
}

export default App;
