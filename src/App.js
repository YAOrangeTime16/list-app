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
    error: '',
    groups: [],
    groupId: '',
    listFlipID: '',
    listVoteID: '',
    loggedinAsAdmin: false,
    loggedinAsMember: false,
    offline: false,
    uid: '',
    userName: '',
    userBelongsToThisGroupAs: '',
  }

  componentWillMount(){
    localforage.config({
      driver: [
               localforage.INDEXEDDB,
               localforage.LOCALSTORAGE
              ]
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
        userRef.update({myGroups: updatedGroups})
			} else {
        userRef.update({myGroups: [{groupName: name, groupId: group.key}]})
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
      //save local
      
      //save database
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
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', connection=> {
      if (connection.val() === false) {
        console.log('offline');
        //check the local DB
        const uid = localStorage.getItem('uid')
        const isAnonymous = localStorage.getItem('isAnonymous')
        if(isAnonymous){
          localforage.getItem('group-login').then(dbInfo=>{
            dbInfo && this.setState({
                        userBelongsToThisGroupAs: 'member',
                        uid: uid,
                        groupId: dbInfo.groupId,
                        loggedinAsMember: true
                      })
          })
        } else {
          localforage.getItem('admin-login').then(dbInfo=>{
            const displayName = localStorage.getItem('disokayName')
            const email = localStorage.getItem('email')
            dbInfo && this.setState({
                        uid: uid,
                        loggedinAsAdmin: true,
                        userName: displayName || email
            })
          })
        }   
      } else if(connection.val()) {
        const auth = firebase.auth()
        console.log('online');
        auth.onAuthStateChanged(user=>{
          if(user){
            if(user.isAnonymous){
              //check the local DB
              localforage.getItem('group-login').then(dbInfo=>{
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
            } else { //User == admin
              this._getGroupIdsOfThisAdmin(user.uid)
              const adminInfo= {
                userBelongsToThisGroupAs: 'admin',
                loggedinAsAdmin: true,
                loggedinAsMember: false,
                uid: user.uid,
                userName: user.displayName || user.email }

              localforage.iterate((value, key)=>{
                if(key.includes('group-')){
                  localforage.removeItem(key)
                }
              })
              localforage.setItem('admin-login', adminInfo)
              return this.setState(adminInfo)
            }
          } else {
            return false
          }
        })
      }
    });
  }

  _getFlipListInfo = groupID => {
    const groupRef = firebase.database().ref(`/groups/${groupID}`)
    groupRef.child('listFlipID').once('value', id=> {
      console.log(id.val())
      if(id.val() !== null) {
        firebase.database().ref(`/flipLists/${id.val()}`)
        .on('value', list => this.setState({flipList: list.val()})
        )
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
		groupsRef.on('value', snap => {
      localforage.setItem('admin-groups', snap.val())
      this.setState({groups: snap.val()})
    })
  }

  _getGroupId = (id) => {
    this.setState({groupId: id})
  }

  _loginGroup = (password, groupID) => {
    if(!password || !groupID) {
      this.setState({error: 'Please fill in the form'})

    } else {

      const connectedRef = firebase.database().ref('.info/connected');
      connectedRef.on('value', connection=> {
        if(connection.val() === false){
          //offline
          const localGroupID = localforage.getItem('group-login').then( info=>{
            const hash = info.hashedPass
            const passOK = bcrypt.compareSync(password, hash)
            if( (info.groupId === groupID) && passOK ){
              this.setState({loggedinAsMember: true, groupId: groupID, error: ''})
            } else {
              this.setState({error: 'Confirm ID or Password, otherwise try again when the device is online'})
            }
          })
        } else if(connection.val()){
          //online
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
                //everything is ready for login
                firebase.auth().signInAnonymously().catch(e=>this.setState({error: e.message}))
                const groupRef = firebase.database().ref(`/groups/${groupID}`)
                groupRef.on('value', group=> {
                  this.setState({
                    loggedinAsMember: true, 
                    groupId: groupID,
                    error: ''
                  })
                  // Save login info to indexedDB
                  localforage.setItem('group-login', {groupId: groupID, loggeinasMember: true, hashedPass: hash})
                })
              }
            }
          })
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
      localforage.clear().then(()=>console.log('storage has been cleared!'))
      cb()
    })
    .catch(e=>this.setState({error: e.message}))
  }

  _logoutGroup = (cb) =>{
    firebase.auth().signOut()
    this.setState({
      groups: [],
      loggedinAsMember: false,
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
        {this.state.offline && <OfflineBox />}
      </section>
    )
  }
}
const OfflineBox = () => {
  const connectedRef = firebase.database().ref('.info/connected');
      connectedRef.on('value', connection=> {
        return connection.cal() ? null : <div>The device is Offline now</div>
      })
}
export default App;
