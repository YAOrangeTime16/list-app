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
    const {addList, closeForm, getUpdate, groupId, type} = this.props
    if(true){
      return (
        <div className="modal">
          <div className="modal-innerbox-large">
            <form onSubmit={e=>e.preventDefault()} className="modal-form">
              <div>
                <input type="text" maxLength="10" onChange={this._addListTitle} value={this.state.listTitle} name='listTitle' placeholder='list title (limited to 10 characters)'/>
                <input type="textarea" maxLength="100" onChange={this._addListTitle} value={this.state.description} name='description' placeholder='Explain about this list' />
                <input type="text" onChange={this._addListTitle} value={this.state.listItem1} name='listItem1' placeholder='item1' />
                <input type="text" onChange={this._addListTitle} value={this.state.listItem2} name='listItem2' placeholder='item2' />
              </div>
              <div className="modal-button-wrapper">
                <Button clickAction={()=>closeForm()} title="cancel" className="btn-secondary" />
                <Button clickAction={()=>{
                  addList(groupId, listTitle, description, listItem1, listItem2, type)
                  closeForm()
                  getUpdate()
                }} title="Add this list" className="btn-primary" />
              </div>
              </form>
            </div>
        </div>)
    }
  }
};

export default CreateList;