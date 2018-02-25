import React, {Component} from 'react'
import {
  Link
} from 'react-router-dom';
import Button from '../General/Button';

class GroupLogin extends Component {
  state={
    authGroupId: '',
    authGroupPw: ''
  }

  _setState = (e) => this.setState({[e.target.name]: e.target.value})
  
  render(){
    const {authGroupId, authGroupPw} = this.state;
    const {loginGroup, error} = this.props;
    return (
      <div>
          <Link to='/admin'>Are youAdmin?</Link>
          <form onSubmit={e=>e.preventDefault()}>
            <input id="gr-id" name="authGroupId" type="text" placeholder="Group ID" onChange={this._setState} value={authGroupId} />
            <input id="gr-pw" name="authGroupPw" type="password" placeholder="Group Password" onChange={this._setState} value={authGroupPw} />
            <Button clickAction={()=>loginGroup(authGroupPw, authGroupId)} title="Login To Group" classname="btn-primary" />
          </form>
          <div>{error}</div>
      </div>
    )   
  }
}

export default GroupLogin;