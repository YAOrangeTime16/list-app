import React from 'react';
import {NavLink} from 'react-router-dom';

const PageMenu = ({clickMenu, existFlip, flipTitle, voteTitle}) => (
  <nav>
    <ul>
<li onClick={clickMenu}>{existFlip ? <NavLink to={{ hash:'#flip'}} name='flip'>Flip</NavLink> : "Flip" }</li>
      <li onClick={clickMenu}><NavLink to={{ hash:'#vote'}} name='vote'>Vote</NavLink></li>
      <li onClick={clickMenu}><NavLink to={{ hash:'#vote'}} name='message'>Message</NavLink></li>
    </ul>
  </nav>
)

export default PageMenu