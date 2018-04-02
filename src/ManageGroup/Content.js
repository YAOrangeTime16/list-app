import React, {Component} from 'react';
import PageMenu from './PageMenu';
import ListItem from './ListItem';
import Chat from '../Chat/Chat';

export default class Content extends Component {

  _showList = contentToShow => {
    switch(contentToShow){
      case 'flip':
      return <ListItem {...this.props} {...this.state} type={'flip'}/>
      break;

      case 'vote':
      return <ListItem {...this.props} {...this.state} type={'vote'} />
      break;

      case 'message':
      return <Chat />
      break;
    }
  }

  render(){
    return(
      <div className="groupContent">
        <PageMenu {...this.props}/>
        {this._showList(this.props.contentToShow)}
      </div>
    )
  }
}