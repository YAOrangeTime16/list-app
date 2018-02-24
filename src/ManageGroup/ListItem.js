import React, {Component} from 'react';
import CreateList from '../ManageUser/CreateList';

class ListItem extends Component {
  state = {
    openFormItem: false,
    openFormList: false
  }


  _showItemInput = () => {
    this.setState({openFormItem: !this.state.addItem})
  }

  _openCreateList = () => {
    this.setState({openFormList: true})
  }

  _closeForm = () => this.setState({openFormList: false})

  _renderItems = (list) => {
    const {addFlipList, groupInfo} = this.props;
    if(list){
      return list.map(item => <li key={item.id}>{item.name}</li>)
    } else if(this.props.userBelongsToThisGroupAs === 'admin') {
      return (!this.state.openFormList
      ? <div onClick={this._openCreateList}>Create List</div>
      : <CreateList {...this.props} groupId={groupInfo.groupUrl} closeForm={this._closeForm} />)
    } else {
      return <div>there is no list</div>
    }
  }

  render(){
    const {flipList, voteList, userBelongsToThisGroupAs, type} = this.props;
    const {openFormItem} = this.state;
    return (
      <div>
        <ul>
          { type==='flip' ? this._renderItems(flipList.items) : type==='vote' ? this._renderItems(voteList.items) : null}
          <li>{openFormItem ? <AddItem /> : null}</li>
          <li onClick={this._showItemInput}>{openFormItem ? 'cancel' : '+ Add item'}</li>
        </ul>
      </div>
    )
  }  
}

const AddItem = (props) => <input type='text' />

export default ListItem;
    
    