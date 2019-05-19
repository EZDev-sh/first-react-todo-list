import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  
  render() {

    const { todos, onToggle, onRemove, onOpen } = this.props;

    const todoList = todos.map(
      ({ id, text, due_date, checked }) => (
        <TodoItem
          id={id}
          text={text}
          due_date={due_date}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          onOpen={onOpen}
          key={id}
        />
      )
    );
    return (
      <div>
        {todoList}
      </div>
    );

  }


}

export default TodoItemList;