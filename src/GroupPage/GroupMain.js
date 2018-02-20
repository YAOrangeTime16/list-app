import React, {Component} from 'react';

import Button from '../General/Button';
import PageMenu from './PageMenu';
import ListItem from './ListItem';

export default class GroupMain extends Component {
  state={
    lists: true,
    flipList: [{id: '01', title: 'item1', status: false}, {id: '02', title: 'item2', status: false}],
    voteList: []
  }

  render(){
    const {flipList, lists} = this.state;
    const {page} = this.props;
    return(
      <div>
        <PageMenu {...this.props}/>
        <p>Group Main Content</p>
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