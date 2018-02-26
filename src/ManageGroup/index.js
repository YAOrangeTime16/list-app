import React, { Component } from 'react';
import firebase from '../firebase';
import bcrypt from 'bcryptjs';
import {Redirect, Route, Switch} from 'react-router-dom';
import './manageGroup.css';
import '../General/Button.css';
import GroupPage from './GroupPage';
import GroupLogin from './GroupLogin';

export default class ManageGroup extends Component {

  state={
  }
    
  componentDidMount(){

  }

 render(){
   const {groupId,loginGroup, loggedinAsMember, error} = this.props;
  return (
    <div className="managegroup-container">
      {
        (loggedinAsMember) ? <Redirect to={`/groups/${groupId}`} />
        : <GroupLogin error={error} loginGroup={loginGroup} />
      }
    </div>
    )
  }
}