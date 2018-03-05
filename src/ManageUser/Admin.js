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
		groupToDelete: '',
		openStatics: false,
		statsFlip: '',
		statsVote: '',
		offlineMessage: ''
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

	_openStatics = groupID => {
		firebase.database().ref('.info/connected')
		.on('value', snap =>{
			if(snap.val()===false){
				this.setState({offlineMessage: 'You are offline now: Information is not available when you are offline'})
			}
			//online
				const groupRef = firebase.database().ref(`/groups/${groupID}`)
				
				groupRef.child('listFlipID').on('value', id => {
					if(id.val() !== '' || id.val() === undefined){
						firebase.database().ref(`/flipLists/${id.val()}`)
						.on('value', listInfo => this.setState({statsFlip: listInfo.val()}))
					}
				})
				groupRef.child('listVoteID').once('value', id => {
					if(id.val() !== '' || id.val() === undefined){
						firebase.database().ref(`/voteLists/${id.val()}`)
						.on('value', listInfo => this.setState({statsVote: listInfo.val()}))
					}
				})
		})
		this.setState({openStatics: true})
	}
	_closeStatics = () => this.setState({openStatics: false, offlineMessage: ''})
	
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
							<div onClick={()=>this._openStatics(group.groupId)}>
								<div className="icon-statics">Statics</div>
							</div>
					</li>
					)
				)
			}
	}

	_renderFlipResult = items => (
		<div>
			{items.map( item => <li key={item.id}>{item.name}: {item.status !=='' ? 'taken' : 'not taken'}</li> )}
		</div>
	)

	_renderVoteResult = items => (
		<div>
			{items.map( item => <li key={item.id}>{item.name}: {item.status ==='' ? '0' : item.status.length}</li> )}
		</div>
	)
	

	render(){
		const {createGroup, deleteConfirm, groupToDelete, offlineMessage, statsFlip, statsVote} = this.state;
		const {addGroup, groups, userName} = this.props;
		return (
			<div>
				<h3>Logged in as: {userName}</h3>
				{ this.state.openStatics && 
							<div className="modal">
								<div className="modal-innerbox-large">
								{ offlineMessage
									? <div>{offlineMessage}</div>
									: (<div>
											<div>List Title (flip): {statsFlip.label || 'no list'}</div>
											<ul>{statsFlip.items && this._renderFlipResult(statsFlip.items)}</ul>
											<div>List Title (vote): {statsVote.label || 'no list'}</div>
											<ul>{statsVote.items && this._renderVoteResult(statsVote.items)}</ul>
										</div>)
								}
									<Button clickAction={this._closeStatics} title="Close"/>
								</div>
							</div>
				}
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