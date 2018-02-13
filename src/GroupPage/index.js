import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import ListFlip from './ListFlip';

const PrivateGroup = () => <div>This is Private</div>;
const loggedin = false;
const Group = () =>
<Route 
  path='/group'
  render={()=> loggedin ? <ListFlip /> : <div>Please log in</div> } 
/>;

export default Group;