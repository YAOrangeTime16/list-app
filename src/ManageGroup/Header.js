import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../General/Button';

const Header = ({loggedinAsAdmin, logoutGroup, groupName, history}) => (
  <header id="group-header">
    <div className="bg-cover">
    {loggedinAsAdmin 
    ? null
    : <Button 
      clickAction={()=>logoutGroup(()=>history.replace('/'))}
      title="logout from group"
      className="btn-secondary logout-group" />
    }
    <Link to='/admin'><div className="link-gotoadmin">{ loggedinAsAdmin ? 'Admin Panel' : 'Login as Admin?'}</div></Link>
    <h1>{groupName}</h1>
    </div>
  </header>
)

export default Header