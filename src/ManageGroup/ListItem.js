import React, {Component} from 'react';
import CreateList from '../ManageUser/CreateList';
import AddItem from './AddItem';

class ListItem extends Component {
  state = {
    openFormItem: false,
    openFormList: false
  }

  _showItemInput = () => this.setState({openFormItem: !this.state.openFormItem})

  _openCreateList = () => this.setState({openFormList: true})

  _closeForm = () => this.setState({openFormList: false})

  _renderItems = (list) => {
    const {openFormItem} = this.state;
    const {addItemToList, changeItemStatus, groupInfo, type, uid} = this.props;
    if(list){
      const classname = (status) => {
        if (type==='flip') {
          return status ? 'flippedItem' : 'flipItem';
        } else if (type==='vote'){
          return (status && status!=='') && status.includes(uid) ? 'votedItem' : 'voteItem';
        } else {
          return null;
        }
      }
      return (
        <ul className="list-container">
          { list.map(item => 
            <li 
              key={item.id}
              onClick={()=>changeItemStatus(item.id, type)}
              className={
                classname(item.status)
              }
            >
              <div>
              {item.name}
              </div>
            </li> 
          )}
           <li className="addItem" onClick={this._showItemInput}>{openFormItem ? 'cancel' : '+ Add item'}</li> 
          <div>{openFormItem ? <AddItem addItemToList={addItemToList} type={type} closeItemInput={this._showItemInput} /> : null}</div> 
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
    const {flipList, voteList, type} = this.props;
    return (
      <div>
        <div>
          <div className="description">
            <p>{type ==='flip' ? flipList.description : type==='vote' ? voteList.description : null}</p>
            <p className="note">{type ==='flip' && 'Here, each item can be taken only by one person.'}</p>
          </div>
          { type==='flip' ? this._renderItems(flipList.items) : type==='vote' ? this._renderItems(voteList.items) : null}
        </div>
      </div>
    )
  }  
}

export default ListItem;
    
    