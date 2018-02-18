import React from 'react'

const PageMenu = ({flipTitle, voteTitle}) => (
  <nav>
    <ul>
      <li>{flipTitle}</li>
      <li>{voteTitle}</li>
      <li>Message</li>
    </ul>
  </nav>
)

export default PageMenu