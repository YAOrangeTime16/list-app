import React, {Component} from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom';

import Button from '../General/Button';
import CreateGroup from './CreateGroup';
import {ArrowMenu, DeleteIcon} from '../assets/items';

export default class Admin extends Component {

	state = {
		createGroup: false,
		deleteConfirm: false,
		groupToDelete: ''
	}

	_deleteTheGroup = groupid => {
		const {uid} = this.props;
		firebase.database().ref(`/groups/${groupid}`)
		firebase.database().ref(`/users/${uid}/myGroups`)
		console.log('delete!')
	}

	_deleteConfirm = groupid => {
		this.setState({deleteConfirm: true, groupToDelete: groupid})
	}

	_openCreatePage = () => this.setState({createGroup: true})
	_cancelCreatePage = () => this.setState({createGroup: false})
	
	_renderGroupList = groupArray => {
		const {deleteConfirm} = this.state;
		const {getGroupId} = this.props;
			if(groupArray){
				return groupArray.map( group => (
					<li key={group.groupId} className="admin-grouplist">
						<div onClick={()=>this._deleteConfirm(group.groupId)}>
							<DeleteIcon />
						</div>
						<div onClick={()=>getGroupId(group.groupId)}>
							<Link to={{
											pathname: '/groups/admin',
											search: `?groupID=${group.groupId}`
										}}
							>{group.groupName}</Link>
						</div>
						<ArrowMenu />
					</li>
					)
				)
			}
	}

	render(){
		const {createGroup, deleteConfirm, groupToDelete} = this.state;
		const {addGroup, groups, userName} = this.props;
		return (
			<div>
				<h3>Logged in as: {userName}</h3>
				{ createGroup
					? <CreateGroup cancelCreatePage={this._cancelCreatePage} addGroup={addGroup}/>
					: (	
						<div>
							{ deleteConfirm ? 
								<div className="modal">
									<div className="modal-innerbox">
										<p>Delete this group? Deletion cannot be undone. All lists to this group are also deleted.</p>
										<div className="modal-button-wrapper">
											<Button clickAction={()=>this.setState({deleteConfirm: false, groupToDelete: ''})} title="Cancel" className="btn-secondary" />
											<Button 
												clickAction={()=>{
													this._deleteTheGroup(groupToDelete)
													this.setState({deleteConfirm: false, groupToDelete: ''})
													}
												}
												title="Delete"
												className="btn-primary" />
											</div>
									</div>
								</div> 
							: null }
							<Button clickAction={this._openCreatePage} title='+ Create New Group' className="btn-primary" />
							<ul>{ this._renderGroupList(groups) }</ul>
						</div>
						)
				}
			</div>
		)
	}
}