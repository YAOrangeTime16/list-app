import React from 'react';
import Button from '../General/Button';

const Header = ({logoutGroup, history}) => (
  <div>
    <h1>groupName</h1>
    <Button clickAction={()=>logoutGroup(()=>history.replace('/'))} title="logout from group" />
  </div>
)

export default Header