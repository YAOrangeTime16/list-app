import React, {Component} from 'react';
import firebase from '../firebase';
import Button from '../General/Button';
import Header from './Header';
import PageMenu from './PageMenu';
import ListItem from './ListItem';

export default class Content extends Component {
  state={
  }

  componentDidMount(){
    
  }

  _showList = contentToShow => {
    switch(contentToShow){
      case 'flip':
      return <ListItem {...this.props} {...this.state} type={'flip'}/>
      break;

      case 'vote':
      return <ListItem {...this.props} {...this.state} type={'vote'} />
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
      </div>
    )
  }
}