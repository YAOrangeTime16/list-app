import React from 'react';
import {NavLink} from 'react-router-dom';

const PageMenu = ({clickMenu, existFlip, flipTitle, voteTitle, location}) => (
  <nav>
    <ul>
      <li onClick={clickMenu}><NavLink to={location.pathname+location.search+'#flip'} name='flip'>Flip</NavLink></li>
      <li onClick={clickMenu}><NavLink to={location.pathname+location.search+'#vote'} name='vote'>Vote</NavLink></li>
      <li onClick={clickMenu}><NavLink to={location.pathname+location.search+'#message'} name='message'>Message</NavLink></li>
    </ul>
  </nav>
)

export default PageMenu