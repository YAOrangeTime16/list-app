import React, {Component} from 'react';
import Button from '../General/Button';

class AddItem extends Component {
  state = {
    newItem: ''
  }

  _setNewItem = e => this.setState({newItem: e.target.value})

  render(){
    const {newItem} = this.state;
    const {addItemToList, closeItemInput, type} = this.props;
    return(
      <div className="modal">
      <div className="modal-innerbox-large">
      <Button clickAction={closeItemInput} title="X" className="btn-circle" />
        <form onSubmit={e=>e.preventDefault()}>  
        <input type="text" value={newItem} onChange={this._setNewItem} />
        <Button 
          clickAction={()=>{
            addItemToList(newItem, type)
            closeItemInput()
            }
          }
          title="Add This Item"
          className="btn-primary" />
        </form>
        </div>
      </div>
    )
  }
}

export default AddItem;