import React, {Component} from 'react';
import firebase from '../firebase';
import Button from './Button';

export default class GroupList extends Component {

  _renderGroupItem = (listArray) => {
    if(listArray){
      return (
        <ul>
          {listArray.map(item => <li key={item.groupId}> {item.groupName} {item.groupId} </li>)}
        </ul>
      )
    }
  }

  render(){
    const {myGroups} = this.props.userInfo;
    const groupList = this._renderGroupItem(myGroups)
    return(
      <div>
          {groupList}
      </div>
    )
  }
}
