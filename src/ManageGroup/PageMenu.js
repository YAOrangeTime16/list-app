import React from 'react';
import {NavLink} from 'react-router-dom';

const PageMenu = ({clickMenu, contentToShow, /*existFlip,*/ flipList, /*flipTitle,*/ voteList, /*voteTitle,*/ location}) => (
  <nav>
    <div className="menu-container">
      <div onClick={clickMenu} className={contentToShow==='flip' ? 'selected' : ''}><NavLink to={location.pathname+'#flip'} name='flip'>{flipList.label || 'FLIP'}</NavLink></div>
      <div onClick={clickMenu} className={contentToShow==='vote' ? 'selected' : ''}><NavLink to={location.pathname+'#vote'} name='vote'>{voteList.label || 'VOTE'}</NavLink></div>
      <div onClick={clickMenu} className={contentToShow==='message' ? 'selected' : ''}><NavLink to={location.pathname+location.search+'#message'} name='message'>Message</NavLink></div>
      </div>
  </nav>
)

export default PageMenu