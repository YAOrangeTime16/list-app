import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import firebase from './firebase';
import localforage from 'localforage';
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

  componentWillMount(){
    localforage.config({
      driver: [
               localforage.INDEXEDDB,
               localforage.LOCALSTORAGE
              ],
      name: 'localforage-ListApp'
    });

  }

  componentDidMount(){
    this._checkUserLoggedInAs()
    this.setState({error: ''})
  }

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
    //save to state or localStorage??: groupObject check wifi connection

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
    const listObject = {
      label: name,
      description: text,
      items: [
        {name: item1, status: '', id: groupID + 'i0'},
        {name: item2, status: '', id: groupID + 'i1'}],
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

  _checkUserLoggedInAs = ()=> {
    const auth = firebase.auth()
    auth.onAuthStateChanged(user=>{
      if(user){
        if(user.isAnonymous){
          //check the local DB
          localforage.getItem('member-login').then(dbInfo=>{
            if(dbInfo){
              this.setState({
                userBelongsToThisGroupAs: 'member',
                uid: user.uid,
                groupId: dbInfo.groupId,
                loggedinAsMember: true
              })
            } else {
              this.setState({
                userBelongsToThisGroupAs: 'member',
                uid: user.uid
              })
            }
          })
        } else {
          this._getGroupIdsOfThisAdmin(user.uid)
          return this.setState({
            userBelongsToThisGroupAs: 'admin',
            loggedinAsAdmin: true,
            loggedinAsMember: false,
            uid: user.uid,
            userName: user.displayName || user.email })
        }
      } else {
        return false
      }
    })
  }

  _getFlipListInfo = groupID => {
    const groupRef = firebase.database().ref(`/groups/${groupID}`)
    groupRef.child('listFlipID').once('value', id=> {
      console.log(id.val())
      if(id.val() !== null) {
        firebase.database().ref(`/flipLists/${id.val()}`)
        .on('value', list => this.setState({
          flipList: list.val()
        }))
      }
    })
  }

  _getVoteListInfo = groupID => {
    const groupRef = firebase.database().ref(`/groups/${groupID}`)
    groupRef.child('listVoteID').once('value', id => {
      console.log(id.val())
      if(id.val() !== null) {
        firebase.database().ref(`/voteLists/${id.val()}`)
        .on('value', list => this.setState({
          voteList: list.val()
        }))
      }
    })
  }

  _getGroupIdsOfThisAdmin = uid => {
		const groupsRef = firebase.database().ref(`/users/${uid}/myGroups`)
		groupsRef.on('value', snap => this.setState({groups: snap.val()}))
  }

  _getGroupId = (id) => {
    this.setState({groupId: id})
  }

  _loginGroup = (password, groupID) => {
    if(!password || !groupID) {
      this.setState({error: 'Please fill in the form'})
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
            const groupRef = firebase.database().ref(`/groups/${groupID}`)
            groupRef.on('value', group=> {
              this.setState({
                loggedinAsMember: true, 
                groupId: groupID,
                error: ''
              }) // Save groupID & loggedinAsMember to local Storage
              localforage.setItem('member-login', {groupId: groupID, loggeinasMember: true})
            })
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
        listFlipID: '',
        listVoteID: '',
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
      listFlipID: '',
      listVoteID: '',
      groupId: ''})
    localforage.clear().then(()=>console.log('storage has been cleared!'))
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
                getFlipListInfo={this._getFlipListInfo}
                getVoteListInfo={this._getVoteListInfo}
                logoutGroup={this._logoutGroup}
                addList={this._addList} />
            }
          />
          <Route path='/admin'
            render={(props)=>
              <ManageUser {...props} {...this.state}
                addGroup={this._addGroup}
                getGroupId={this._getGroupId}
                logoutAdmin={this._logoutAdmin}
                singupAdmin={this._signupAdmin}
              />
            }
          />
        </Switch>
      </section>
    )
  }
}

export default App;
