import React, { Component } from 'react';
import firebase from '../firebase';
import {Link} from 'react-router-dom';
import Header from './Header';
import Content from './Content';

class GroupPage extends Component {
  state={
    groupInfo: '',
    contentToShow: 'flip',
    existFlip: false
  }

  _getGroupInfo = ()=>{
    const {location, match} = this.props
    const theGroupsID = (location.search) ? location.search.substr(9) : match.params.id;
    if(theGroupsID){
      const groupRef = firebase.database().ref(`/groups/${theGroupsID}`)
      groupRef.once('value', info=> this.setState({groupInfo: info.val()}) )
    }
  }

  componentDidMount(){
    this._getGroupInfo()
  }

  _clickMenu = (e) => {
    this.setState({contentToShow: e.target.name})
  }

  render(){
    const {groupInfo} = this.state
    const {logoutGroup, loggedinAdmin, location, history} = this.props
    return(
      <div>
        <Header history={history} logoutGroup={logoutGroup} />
        <Content {...this.state} clickMenu={this._clickMenu} createList={this._createList} />
        <Link to='/admin'>{ loggedinAdmin ? 'Admin Panel' : 'Login as Admin?'}</Link>
      </div>
    )
  }
}

export default GroupPage
