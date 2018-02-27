import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({loggedinAsAdmin, groupName, history}) => (
  <header id="group-header">
    <div className="bg-cover">
    <Link to='/admin'><div className="link-adminlogin">{ loggedinAsAdmin ? 'Admin Panel' : 'Login as Admin?'}</div></Link>
    <h1>{groupName}</h1>
    </div>
  </header>
)

export default Header