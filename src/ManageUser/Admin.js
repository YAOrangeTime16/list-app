import React, {Component} from 'react';
import firebase from '../firebase';

import Button from './Button';
import GroupList from './GroupList';

const duplicationCheck = (objectArray, checkObject) =>{
	const filteredArray = objectArray.filter( item => item.groupName !== checkObject.groupName )
	if(filteredArray.length !== objectArray.length){
		return false
	}
	return true
}

export default class Admin extends Component {
	state = {
		createGroup: null,
		groups: [],
		userId: null,
		userKey: null,
		error: ''
	}

	componentDidMount(){
		firebase.database().ref(`/groups`).on('child_added', snap=>{
			this.setState({groups: [...this.state.groups, snap.val()]})
		})
		//this.getUserKey()
	}
	getUserKey = () => {
		firebase.database().ref(`/users`).on('add_child', snap => {
			this.setState({userKey: snap.key})
		})
		
	}

	_createGroup = () => {
		this.setState({error: ''});
		import('./CreateGroup')
		.then(module=>this.setState({createGroup: module.default}));
		const userInfo = firebase.auth().currentUser;
		this.setState({userId: userInfo.uid})
	}

	_addGroup = (name, pw) => {
		const groupObject = {groupName: name, groupPass: pw, user: this.state.userId}
		const checkArray = [...this.state.groups]
		const readyToAdd = duplicationCheck(checkArray, groupObject);
		if(readyToAdd){
			firebase.database().ref(`/groups`).push(groupObject)
			.then(group=>
			firebase.database().ref(`/groups`).child(`/${group.key}`).update({groupUrl: group.key})
		)
			this.setState({groups: [...this.state.groups, groupObject]})
		} else {
			this.setState({error: 'The group name exists already'})
		}
	}
	
	_resetModuleCall = () => this.setState({createGroup: null})

	render() {
		const { createGroup: CreateGroup, groups, error } = this.state;
		const { logout } = this.props;
		return(
			<section>
				<h1>Admin Page</h1>
				<div>{error}</div>
				{CreateGroup 
					? <CreateGroup addGroup={this._addGroup} resetModuleCall={this._resetModuleCall}/> 
					: <Button clickAction={this._createGroup} title="Create Group" />
				}
				<GroupList groups={groups} groupName="My Gr" groupKey="grkey" />
				<Button clickAction={logout} title="Log out" />
				</section>
		)
	}
}