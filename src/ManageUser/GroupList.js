import React, {Component} from 'react';
import firebase from '../firebase';

export default class GroupList extends Component {

  _renderGroupItem = (groupArray) => groupArray.map(item => <li key={item.groupUrl}>{item.groupName}/{item.groupUrl}</li>)

  render(){
    const {groups} = this.props;
    return(
      <div>
        <ul>
          {this._renderGroupItem(groups)}
        </ul>
      </div>
    )
  }
}
