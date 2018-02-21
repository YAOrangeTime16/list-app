import React from 'react';
import {NavLink} from 'react-router-dom';

const PageMenu = ({flipTitle, voteTitle}) => (
  <nav>
    <ul>
      <li><NavLink to={{ hash:'#flip'}}>{flipTitle}</NavLink></li>
      <li><NavLink to={{ hash:'#vote'}}>{voteTitle}</NavLink></li>
      <li>Message</li>
    </ul>
  </nav>
)

export default PageMenu