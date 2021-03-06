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
          <Link to='/admin'><div className="link-adminlogin">Login as admin?</div></Link>
          <h1>Group Login</h1>
          <form onSubmit={e=>e.preventDefault()}>
            <input id="gr-id" name="authGroupId" type="text" placeholder="Group ID" onChange={this._setState} value={authGroupId} />
            <input id="gr-pw" name="authGroupPw" type="password" placeholder="Group Password" onChange={this._setState} value={authGroupPw} />
            <Button clickAction={()=>loginGroup(authGroupPw, authGroupId)} title="Login To Group" className="btn-primary btn-wide" />
          </form>
          <p className="error-text">{error}</p>
      </div>
    )   
  }
}

export default GroupLogin;