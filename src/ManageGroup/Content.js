import React, {Component} from 'react';

import Button from '../General/Button';
import Header from './Header';
import PageMenu from './PageMenu';
import ListItem from './ListItem';

export default class Content extends Component {
  state={
    lists: true,
    flipList: [{id: '01', title: 'item1', status: false}, {id: '02', title: 'item2', status: false}],
    voteList: []
  }



  _showList = contentToShow => {
    switch(contentToShow){
      case 'flip':
      return <div>flip list</div>
      break;

      case 'vote':
      return <div>vote list</div>
      break;

      case 'message':
      return <div>message</div>
      break;
    }
  }

  render(){
    const {flipList, lists} = this.state;
    const {createList, page, groupName, logout, groupInfo} = this.props;
    return(
      <div>
        <PageMenu {...this.props}/>
        <p>Group Main Content</p>
        {this._showList(this.props.contentToShow)}
        { lists 
          ? <ListItem
              {...this.props}
              flipList={this.state.flipList}
              voteList={this.state.voteList} />
          : <Button
              clickAction=''
              title={ page==='flip' ? "List-Flip" : page==='vote' && "List-Vote" } />
        }
      
      </div>
    )
  }
}