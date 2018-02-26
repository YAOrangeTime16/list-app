import React, {Component} from 'react';
import firebase from '../firebase';
import bcrypt from 'bcryptjs';
import {Link, NavLink} from 'react-router-dom';

import Button from '../General/Button';
import CreateGroup from './CreateGroup';
import GroupList from './GroupList';
import CreateList from './CreateList';

export default class Admin extends Component {

	state = {
		createGroup: false
	}

	_openCreatePage = () => this.setState({createGroup: true})
	_cancelCreatePage = () => this.setState({createGroup: false})
	
	_renderGroupList = groupArray => {
		const {getGroupId} = this.props;
			if(groupArray){
				return groupArray.map( group => (
					<li className="admin-grouplist" key={group.groupId} onClick={()=>getGroupId(group.groupId)}>
							<Link to={{
										pathname: '/groups/admin',
										search: `?groupID=${group.groupId}`,
										state: { loggedinGroup: true }
									}}
							>
							{group.groupName}
							</Link>
					</li>
					)
				)
			}
	}

	render(){
		const {createGroup} = this.state;
		const {addGroup, groupId, uid, location, groups, groupName, userName, addFlipList} = this.props;
		return (
			<div>
				<h3>Logged in as: {userName}</h3>
				{ createGroup
					? <CreateGroup cancelCreatePage={this._cancelCreatePage} addGroup={addGroup}/>
					: (	
						<div>
							<Button clickAction={this._openCreatePage} title='+ Create New Group' className="btn-primary" />
							<ul>{ this._renderGroupList(groups) }</ul>
						</div>
						)
				}
			</div>
		)
	}
}