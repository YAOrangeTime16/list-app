import React, { Component } from 'react';
import firebase from '../firebase';
import bcrypt from 'bcryptjs';
import {Redirect, Route, Switch} from 'react-router-dom';
import './style.css';
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
    <div>
      {
        (loggedinAsMember) ? <Redirect to={`/groups/${groupId}`} />
        : <GroupLogin error={error} loginGroup={loginGroup} />
      }
    </div>
    )
  }
}