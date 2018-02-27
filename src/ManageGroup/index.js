import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './manageGroup.css';
import '../General/Button.css';
import GroupLogin from './GroupLogin';

export default class ManageGroup extends Component {

  state={
  }
    
  componentDidMount(){

  }

 render(){
   const {groupId,loginGroup, loggedinAsMember, error} = this.props;
  return (
    <div id="managegroup-container">
      <div className="managegroup-cover">
        <div className="managegroup-content">
        {
          (loggedinAsMember) ? <Redirect to={`/groups/${groupId}`} />
          : <GroupLogin error={error} loginGroup={loginGroup} />
        }
        </div>
      </div>
    </div>
    )
  }
}