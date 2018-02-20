import React, {Component} from 'react';
import Button from '../General/Button';

class ListItem extends Component {
  state = {
    addItem: false,
  }

  _showItemInput = () => {
    this.setState({addItem: !this.state.addItem})
  }

  _renderItems = itemArray => itemArray.map(item => <li key={item.id}>{item.title}</li>)

  render(){
    const {page, flipList} = this.props;
    const {addItem} = this.state;
    return (
      <div>
        <ul>
          {this._renderItems(flipList)}
          <li>{addItem ? <AddItem /> : null}</li>
          <li onClick={this._showItemInput}>{addItem ? 'cancel' : '+ Add item'}</li>
        </ul>
      </div>
    )
  }  
}

const AddItem = (props) => <input type='text' />

export default ListItem;
    
    