import React, {Component} from 'react';
import Button from '../General/Button';

class CreateList extends Component {
  state = {
    listTitle: '',
    listItem1: '',
    listItem2: '',
    description: '',
    type: ''
  }

  _addListTitle = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    const {listTitle, listItem1, listItem2, description} = this.state;
    const {addListTitle, addList, closeForm, getUpdate, groupId, type} = this.props
    if(true){
      return (
        <div className="modal">
        <form onSubmit={e=>e.preventDefault()} >
          <input type="text" onChange={this._addListTitle} value={this.state.listTitle} name='listTitle' placeholder='list title'/>
          <input type="text" onChange={this._addListTitle} value={this.state.description} name='description' placeholder='Explain about this list' />
          <input type="text" onChange={this._addListTitle} value={this.state.listItem1} name='listItem1' placeholder='item1' />
          <input type="text" onChange={this._addListTitle} value={this.state.listItem2} name='listItem2' placeholder='item2' />
          <Button clickAction={()=>closeForm()} title="cancel" classname="btn-cancel" />
          <Button clickAction={()=>{
            addList(groupId, listTitle, description, listItem1, listItem2, type)
            closeForm()
            getUpdate()
          }} title="Add this list" classname="btn-primary" />
          </form>
        </div>)
    }
  }
};

export default CreateList;