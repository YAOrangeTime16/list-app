import React, {Component} from 'react';
import Button from '../General/Button';

class CreateList extends Component {
  render(){
    const {addListTitle, addFlipList, closeForm, listTitle, groupIdTemp: groupId} = this.props
    if(true){
      return (
        <div className="modal">
          <input type="text" onChange={addListTitle} value={this.props.listTitle} placeholder={`${this.props.listType} list title`}/>
          <Button clickAction={()=>{
            addFlipList(groupId, listTitle)
            closeForm()
          }} title="add this list"/>
        </div>)
    }
  }
};

export default CreateList;