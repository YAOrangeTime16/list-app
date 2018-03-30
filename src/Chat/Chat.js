import React, {Component} from 'react';
import Messages from './Messages';
import {SendIcon} from '../assets/items';
import './chat.css';

export default class Chat extends Component {
  state = {
    message:''
  }

  _onChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(
      <div>
        <Messages newMessage={this.state.message} />
        <div className="message-input-form">
          <input type="text" name="message" className="message-input" value={this.state.message} onChange={this._onChange}/>
          <SendIcon />
        </div>
      </div>
    );
  }
}