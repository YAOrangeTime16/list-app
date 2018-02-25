import React from 'react';
import Button from '../General/Button';
//import '../assets/header_bg.jpg';

const Header = ({logoutGroup, groupName, history}) => (
  <header>
    <div className="bg-cover">
    <h1>{groupName}</h1>
    <Button clickAction={()=>logoutGroup(()=>history.replace('/'))} title="logout from group" />
    </div>
  </header>
)

export default Header