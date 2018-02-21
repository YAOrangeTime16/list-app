import React, { Component } from 'react';
import Header from './GroupHeader';
import Content from './Content';
const GroupPage = ({groupName, logout}) => (
  <div>
    <Header groupName={groupName} logout={logout}/>
    <Content />
  </div>
)

export default GroupPage
