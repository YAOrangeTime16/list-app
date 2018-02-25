import React from 'react';
import {NavLink} from 'react-router-dom';

const PageMenu = ({clickMenu, contentToShow, existFlip, flipTitle, voteTitle, location}) => (
  <nav>
    <div className="menu-container">
      <div onClick={clickMenu} className={contentToShow==='flip' ? 'selected' : ''}><NavLink to={location.pathname+location.search+'#flip'} name='flip'>Flip</NavLink></div>
      <div onClick={clickMenu} className={contentToShow==='vote' ? 'selected' : ''}><NavLink to={location.pathname+location.search+'#vote'} name='vote'>Vote</NavLink></div>
      <div onClick={clickMenu} className={contentToShow==='message' ? 'selected' : ''}><NavLink to={location.pathname+location.search+'#message'} name='message'>Message</NavLink></div>
    </div>
  </nav>
)

export default PageMenu