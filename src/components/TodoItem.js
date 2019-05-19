import React, { Component } from 'react';
import './TodoItem.css';

import ModifyImg from '../assets/images/modify_icon.png';

class TodoItem extends Component {
  render() {
    const { text, due_date, checked, id, onToggle, onRemove, onOpen } = this.props;

    return (
      <div className="todo-item">
        <input type="checkbox" value={checked} onClick={() => onToggle(id)}></input>
        <div className={`todo-text ${checked && 'checked'}`}>
          <div>{text}</div>
        </div>
        <div className="todo-date">
          <div>{due_date}</div>
        </div>
        <div className="modify" onClick={(e) => {
          onOpen(id)
        }}>
          <img className="modify-icon" src={ModifyImg} alt='modify-icon' />
        </div>
        <div className="remove" onClick={(e) => {
          onRemove(id)
        }
        }>&times;</div>

      </div>
    );
  }
}

export default TodoItem;