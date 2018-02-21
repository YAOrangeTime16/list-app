import React from 'react';
import Button from '../General/Button';

const Header = ({groupName, logout}) => (
  <div>
    <h1>{groupName}</h1>
    <Button actionType={logout} title="logout from group" />
  </div>
)

export default Header