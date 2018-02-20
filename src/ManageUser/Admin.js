import React, {Component} from 'react';
import firebase from '../firebase';
import bcrypt from 'bcryptjs';

import Button from '../General/Button';
import CreateGroup from './CreateGroup';
import GroupList from './GroupList';

export default class Admin extends Component {
	state = {
		createGroup: false,
		userKey: null,
		error: '',
		groupId: '',
		groupName: '',
		myGroups: null
	}

	_addGroup = (name, pw) => {
		const { userInfo } = this.props;

		const hash = bcrypt.hashSync(pw, 10);
		const groupObject = {
			groupName: name,
			groupPass: hash,
			uid: userInfo.uid
		}
		
		firebase.database().ref(`/groups`).push(groupObject)
		.then(group=>{
			//set groups url to the group object
			firebase.database().ref(`/groups`).child(`/${group.key}`).update({groupUrl: group.key})
			//set groups id under the user info
			const userRef = firebase.database().ref(`/users/${userInfo.uid}`);
			if(userInfo.myGroups){
				const updatedGroups = [...userInfo.myGroups, {groupName: name, groupId: group.key}];
				//const updatedUserInfo = Object.assign(userInfo, {myGroups: updatedGroups} )
				userRef.update({myGroups: updatedGroups})
			} else {
				userRef.update({myGroups: [{groupName: name, groupId: group.key}]})
			}
		})
	}

	componentDidMount(){
		
	}

	_getGroupInfo = groupid => {
    const groupRef = firebase.database().ref('/groups').child(groupid);
    groupRef.once('value', snap => 
    this.setState({groupId: snap.key, groupName: snap.val().groupName}))
  }
	
	_openAddGroup = () => {
		this.setState({error: '', createGroup: true})
	}

	_resetModuleCall = () => this.setState({createGroup: false})

	render() {
		const { createGroup, error } = this.state;
		const { logout, userInfo } = this.props;
		return(
			<section>
				<h1>Logged in as {userInfo.displayName || userInfo.email}</h1>
				<div>{error}</div>
				{
					createGroup
					? <CreateGroup addGroup={this._addGroup} resetModuleCall={this._resetModuleCall}/> 
					: <Button clickAction={this._openAddGroup} title="Create Group" />
				}
				<GroupList userInfo={userInfo} getGroupInfo={this._getGroupInfo} />
				<Button clickAction={logout} title="Log out" />
				</section>
		)
	}
}