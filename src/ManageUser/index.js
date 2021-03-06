import React, { Component } from 'react';

import Admin from './Admin';
import Login from './Login';
import './manageUser.css';
import '../General/Button.css';

class ManageUser extends Component {

  render(){
    const {groupId, logoutAdmin, loggedinAsAdmin, groups, history} = this.props;
    return (
      <div className="manageuser-container">
        { !loggedinAsAdmin 
            ? <Login />
            : (<div>
                <Admin {...this.props} groupId={groupId} groups={groups}/>
                <button onClick={()=>logoutAdmin(()=>history.replace('/admin'))} className="btn-secondary logout-admin">Logout from Admin</button>
              </div>)
        }
      </div>
      )
    }
}

export default ManageUser;