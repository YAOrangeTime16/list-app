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
    const {addGroup, cancelCreatePage} = this.props;
    return(
      <form onSubmit={e=>e.preventDefault()}>
        <input name="groupName" value={groupName} onChange={this._setValue} type="text" placeholder="Group Name" />
        <input name="groupPassword" value={groupPassword} onChange={this._setValue} type="password" placeholder="Group Password" />
        <Button
          clickAction={cancelCreatePage}
          title="Cancel"
          className="btn-secondary" />
        <Button 
          clickAction={ ()=>{
            addGroup(groupName, groupPassword)
            cancelCreatePage()
          } }
          title="Add This Group"
          className="btn-primary" />
      </form>
    )
  }
}
