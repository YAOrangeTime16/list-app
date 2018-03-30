import React, {Component} from 'react';
export default class Messages extends Component {
  render(){
    return(
      <div className="chat-area">
        <p>{this.props.newMessage}</p>
      </div>
    );
  }
}