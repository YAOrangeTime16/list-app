import React, { Component } from 'react';

import Button from '../General/Button';

export default class CreateGroup extends Component {
  state = {
    groupName: '',
    groupPassword: '',
    confirmPass: ''
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  _confirmPassword = (name, password) => {
    const {groupPassword, confirmPass} = this.state;
    const {addGroup} = this.props;
    if((groupPassword !== '') && (groupPassword === confirmPass)){
      this.setState({error: ''})
      return true;
    } else {
      this.setState({error: 'Please make sure passwords are correct'})
      return false;
    }
  }
  
  render(){
    const {groupName, groupPassword, confirmPass, error} = this.state;
    const {addGroup, cancelCreatePage} = this.props;
    return(
      <div className="modal">
        <div className="modal-innerbox-large">
          <form onSubmit={e=>e.preventDefault()}>
            <Button
              clickAction={cancelCreatePage}
              title="X"
              className="btn-circle" />
            <input name="groupName" value={groupName} onChange={this._setValue} type="text" placeholder="Group Name" className="border-bottom" />
            <input name="groupPassword" value={groupPassword} onChange={this._setValue} type="password" placeholder="Group Password" className="border-bottom" />
            <input name="confirmPass" value={confirmPass} onChange={this._setValue} type="password" placeholder="Confirm Group Password" className="border-bottom" />
            <Button 
              clickAction={ ()=>{
                if(this._confirmPassword()){
                  addGroup(groupName, groupPassword)
                  cancelCreatePage()
                }
              } }
              title="Add This Group"
              className="btn-primary" />
              <p className="error-text">{error}</p>
          </form>
        </div>
      </div>
    )
  }
}
