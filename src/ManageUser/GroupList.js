import React, {Component} from 'react';
import { Link } from 'react-router-dom';
  
export default class GroupList extends Component {

  _renderGroupItem = listArray => {
    const {getGroupInfo} = this.props;
    if(listArray){
      return (
        <ul>
          {listArray.map(usersgroup => 
            (<li key={usersgroup.groupId} onClick={()=>getGroupInfo(usersgroup.groupId)}>
              <Link to={`/groups/${usersgroup.groupId}`} >
                {usersgroup.groupName} {usersgroup.groupId}
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
