import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Admin from './Admin';
import Login from './Login';

class ManageUser extends Component {
  render(){
    const { user, userInfo, logout } = this.props;
    return (
      <div>
        {!userInfo 
            ? <Login />
            : (<div>
                <Admin user={user} userInfo={userInfo} logout={logout}/>
              </div>)
        }
      </div>
      )
    }
}

export default ManageUser;