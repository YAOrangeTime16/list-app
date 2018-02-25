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
    const {addFlipList, groupInfo, type} = this.props;
    if(list){
      return list.map(item => <li key={item.id} className={type==='flip' ? 'flipItem' : type==='vote' ? 'voteItem' : null}>{item.name}</li>)
    } else if(this.props.userBelongsToThisGroupAs === 'admin') {
      return (!this.state.openFormList
      ? <div onClick={this._openCreateList} className="createList">Create List</div>
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
        <ul className="list-container">
          <p className="description">{type ==='flip' ? flipList.description : type==='vote' ? voteList.description : null}</p>
          { type==='flip' ? this._renderItems(flipList.items) : type==='vote' ? this._renderItems(voteList.items) : null}
          <div>{openFormItem ? <AddItem /> : null}</div>
          <li onClick={this._showItemInput}>{openFormItem ? 'cancel' : '+ Add item'}</li>
        </ul>
      </div>
    )
  }  
}

const AddItem = (props) => <input type='text' />

export default ListItem;
    
    