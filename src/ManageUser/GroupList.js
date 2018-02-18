import React, {Component} from 'react';
import firebase from '../firebase';
import Button from './Button';

export default class GroupList extends Component {

  _goToGroupPage = () => {

  }

  _renderGroupItem = listArray => {
    const {setGroupId} = this.props;
    if(listArray){
      return (
        <ul>
          {listArray.map(item => <li key={item.groupId} onClick={()=>setGroupId(item.groupId)}> {item.groupName} {item.groupId} </li>)}
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
