import React, { Component } from 'react';
import './TodoItem.css';
import ModifyImg  from '../assets/images/modify_icon.png';

class TodoItem extends Component {
  render() {
    const { text, due_date, checked, id, onToggle, onRemove, onOpen /*onModify*/ } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        {
          checked && (<div className="check-mark">✓</div>)
        }
        <div className={`todo-text ${checked && 'checked'}`}>
          <div>{text}</div>
        </div>
        <div className="todo-date">
          <div>{due_date}</div>
        </div>
        <div className="modify" onClick={(e) => {
          e.stopPropagation();
          onOpen(id)
        }}>
          <img className="modify-icon" src={ModifyImg}/>
        </div>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        
      </div>
    );
  }
}

export default TodoItem;