import React, { Component } from 'react';

import Button from '../General/Button';

export default class CreateGroup extends Component {
  state = {
    groupName: '',
    groupPassword: ''
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  
  render(){
    const {groupName, groupPassword} = this.state;
    const {addGroup, resetModuleCall} = this.props;
    return(
      <form>
        <input name="groupName" value={groupName} onChange={this._setValue} type="text" placeholder="Group Name" />
        <input name="groupPassword" value={groupPassword} onChange={this._setValue} type="password" placeholder="Group Password" />
        <Button
          clickAction={e=>{
            e.preventDefault()
            resetModuleCall()
          }}
          title="Cancel"/>
        <Button 
          clickAction={e =>{
            e.preventDefault();
            resetModuleCall()
            addGroup(groupName, groupPassword)}} 
          title="Add This Group" />
      </form>
    )
  }
}
