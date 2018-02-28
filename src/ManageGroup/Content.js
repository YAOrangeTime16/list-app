import React, {Component} from 'react';
import PageMenu from './PageMenu';
import ListItem from './ListItem';

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
      return <div>message</div>
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