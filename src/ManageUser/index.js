import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import firebase from '../firebase';
import Admin from './Admin';
import Login from './Login';

class ManageUser extends Component {
  state = {
  }
  
  componentDidMount(){
    
  }

  render(){
    const {groupId, logoutAdmin, loggedinAdmin, loggedInAs, groups, history} = this.props;
    return (
      <div>
        { !loggedinAdmin 
            ? <Login />
            : (<div>
                <Admin {...this.props} groupId={groupId} groups={groups}/>
                <button onClick={()=>logoutAdmin(()=>history.replace('/admin'))}>Logout from Admin</button>
              </div>)
        }
      </div>
      )
    }
}

export default ManageUser;