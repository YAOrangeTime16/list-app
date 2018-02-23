import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Content from './Content';

const GroupPage = ({logoutGroup, loggedinAdmin, history}) => (
  <div>
    <Header history={history} logoutGroup={logoutGroup}/>
    <Content />
    <Link to='/admin'>{ loggedinAdmin ? 'Admin Panel' : 'Login as Admin?'}</Link>
  </div>
)

export default GroupPage
