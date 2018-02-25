import React, {Component} from 'react';
import CreateList from '../ManageUser/CreateList';

class ListItem extends Component {
  state = {
    openFormItem: false,
    openFormList: false
  }


  _showItemInput = () => {
    this.setState({openFormItem: !this.state.openFormItem})
  }

  _openCreateList = () => {
    this.setState({openFormList: true})
  }

  _closeForm = () => this.setState({openFormList: false})

  _renderItems = (list) => {
    const {openFormItem} = this.state;
    const {addFlipList, groupInfo, type} = this.props;
    if(list){
      return (
        <ul className="list-container">
          { list.map(item => 
            <li key={item.id} className={type==='flip' ? 'flipItem' : type==='vote' ? 'voteItem' : null}>{item.name}</li>
            )}
           <li className="addItem" onClick={this._showItemInput}>{openFormItem ? 'cancel' : '+ Add item'}</li> 
          <div>{openFormItem ? <AddItem /> : null}</div> 
        </ul>
      )
    } else if(this.props.userBelongsToThisGroupAs === 'admin') {
      return (
        !this.state.openFormList
        ? <div onClick={this._openCreateList} className="createList">Create List</div>
        : <CreateList {...this.props} groupId={groupInfo.groupUrl} closeForm={this._closeForm} />)
    } else {
      return <div className="contentTitle">there is no list</div>
    }
  }

  render(){
    const {flipList, voteList, userBelongsToThisGroupAs, type} = this.props;
    const {openFormItem} = this.state;
    return (
      <div>
        <div>
          <p className="description">{type ==='flip' ? flipList.description : type==='vote' ? voteList.description : null}</p>
          { type==='flip' ? this._renderItems(flipList.items) : type==='vote' ? this._renderItems(voteList.items) : null}
        </div>
      </div>
    )
  }  
}

const AddItem = (props) => <input type='text' />

export default ListItem;
    
    