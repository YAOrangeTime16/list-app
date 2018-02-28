import React, { Component } from 'react';
import firebase from '../firebase';
import Button from '../General/Button';
import Header from './Header';
import Content from './Content';

class GroupPage extends Component {
  state={
    groupInfo: '',
    contentToShow: 'flip',
    flipList: '',
    voteList: ''
  }

  _addItemToList = (newItemName, listType) => {
    const {flipList, voteList, groupInfo} = this.state;
    if(listType==='flip' && flipList){
      const numberOfCurrentItem = flipList.items.length;
      const newItem = {
        id: `${flipList.groupId}i${numberOfCurrentItem}`,
        name: newItemName,
        status: false
      }
      const updateItemsArray = [...flipList.items, newItem]
      const updateList = Object.assign({...flipList}, {items: updateItemsArray})
      this.setState({flipList: updateList})

      firebase.database().ref(`/flipLists/${groupInfo.listFlipID}/items`).set(updateItemsArray)

    } else if(listType==='vote' && voteList){
      const numberOfCurrentItem = voteList.items.length;
      const newItem = {
        id: `${voteList.groupId}i${numberOfCurrentItem}`,
        name: newItemName,
        status: []
      }
      const updateItemsArray = [...voteList.items, newItem]
      const updateList = Object.assign({...voteList}, {items: updateItemsArray})
      this.setState({voteList: updateList})

      firebase.database().ref(`/voteLists/${groupInfo.listVoteID}/items`).set(updateItemsArray)
    } else {
      return;
    }
  }

  _changeItemStatus = (selectedItemID, listType) => {
    const {flipList, voteList, groupInfo} = this.state;
    const {uid} = this.props;
    const index = selectedItemID.substr(-1);

    if(listType==='flip' && selectedItemID){
      const itemToUpdateStatus = flipList.items[index];
      const updatedStatus = Object.assign(itemToUpdateStatus, {status: !itemToUpdateStatus.status})
      const itemArray = [...flipList.items];
      itemArray.splice(index, 1, updatedStatus);
      const updatedItemObject = Object.assign({...flipList}, {items: itemArray})
      
      this.setState({flipList: updatedItemObject})
      firebase.database().ref(`/flipLists/${groupInfo.listFlipID}/items`).set(itemArray)
    
    } else if (listType==='vote' && selectedItemID){
      const itemToUpdateStatus = voteList.items[index];
      const currentVoters = [...itemToUpdateStatus.status]
      const voted = currentVoters.includes(uid);
      if(voted){
        return false;
      } else {
        const updatedStatus = Object.assign(itemToUpdateStatus, {status: [...currentVoters, uid]})
        console.log(updatedStatus)
        firebase.database().ref(`/voteLists/${groupInfo.listVoteID}/items/${index}`).set(updatedStatus)
      }
    }
  }

  componentDidMount(){
    this._getGroupInfo()
  }

  componentWillUpdate(nextProps){
    if((nextProps.listFlipID !== this.props.listFlipID) || (nextProps.listVoteID !== this.props.listVoteID)){
      this._getGroupInfo()
    }
  }

  _clickMenu = (e) => {
    this.setState({contentToShow: e.target.name})
  }

  _getGroupInfo = ()=>{
    const {location, match} = this.props
    const theGroupsID = (location.search) ? location.search.substr(9) : match.params.id;
    if(theGroupsID){
      const groupRef = firebase.database().ref(`/groups/${theGroupsID}`)
      groupRef.once('value', info=> this.setState({groupInfo: info.val()}) )
      .then(()=>{
        this.state.groupInfo.listFlipID!=='' && this._getFlipListInfo(this.state.groupInfo.listFlipID)
        this.state.groupInfo.listVoteID!=='' && this._getVoteListInfo(this.state.groupInfo.listVoteID)
      })
    }
  }

  _getUpdate = () => {
    const {listFlipID, listVoteID} = this.props;
    firebase.database().ref(`/flipList/${listFlipID}`).on('value', snap=> console.log(snap.val()))
    firebase.database().ref(`/voteList/${listVoteID}`).on('value', snap=> console.log(snap.val()))
    const updateGroupInfo = {...this.state.groupInfo}
  }

  _getFlipListInfo = (flipID) => {
    if(flipID){
      firebase.database().ref(`/flipLists/${flipID}`)
      .on('value', list => this.setState({flipList: list.val()}))
    }
  }

  _getVoteListInfo = (voteID) => {
    if(voteID){
      firebase.database().ref(`/voteLists/${voteID}`)
      .on('value', list => this.setState({voteList: list.val()}))
    }
  }

  render(){
    const {groupInfo} = this.state
    const {logoutGroup, history} = this.props
    return(
      <div>
        <Header {...this.props} history={history} groupName={groupInfo.groupName} />
        <Content {...this.state} {...this.props}
            addItemToList={this._addItemToList}
            changeItemStatus={this._changeItemStatus}
            clickMenu={this._clickMenu}
            createList={this._createList}
            getUpdate={this._getUpdate}
            logoutGroup={logoutGroup} />
        <Button 
            clickAction={()=>logoutGroup(()=>history.replace('/'))}
            title="logout from group"
            className="btn-secondary logout-group" />
      </div>
    )
  }
}

export default GroupPage
