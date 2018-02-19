import React, {Component} from 'react';
import firebase from '../firebase';
import { Link, Route } from 'react-router-dom';
import Button from './Button';
import GroupPage from '../GroupPage';
  
export default class GroupList extends Component {

  _renderGroupItem = listArray => {
    const {getGroupInfo} = this.props;
    const {uid} = this.props.userInfo;
    if(listArray){
      return (
        <ul>
          {listArray.map(item => 
            (<li key={item.groupId} onClick={()=>getGroupInfo(item.groupId)}>
              <Link to={`/groups/${item.groupId}`} >
                {item.groupName} {item.groupId}
              </Link>
            </li>)
          )}
        </ul>
      )
    }
  }

  render(){
    const {myGroups} = this.props.userInfo;
    return(
      <div>
          {this._renderGroupItem(myGroups)}
      </div>
    )
  }
}
