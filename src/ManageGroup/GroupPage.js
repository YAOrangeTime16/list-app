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

  render(){
    const {groupInfo} = this.state
    const {logoutGroup, loggedinAsAdmin, location, history} = this.props
    return(
      <div>
        <Header history={history} {...this.props} groupName={groupInfo.groupName} />
        <Content {...this.state} {...this.props} clickMenu={this._clickMenu} createList={this._createList} logoutGroup={logoutGroup} getUpdate={this._getUpdate}/>
        <Button clickAction={()=>logoutGroup(()=>history.replace('/'))} title="logout from group" className="btn-secondary logout-group" />
      </div>
    )
  }
}

export default GroupPage
