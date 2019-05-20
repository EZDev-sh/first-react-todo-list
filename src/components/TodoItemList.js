import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

class TodoItemList extends Component {

  render() {

    const { todos, onToggle, onRemove, onOpen, provided } = this.props;


    return (
      <div
        ref={provided.innerRef}>
        {todos.map(
          ({ id, text, due_date, checked }, index) => (
            <Draggable
              key={id}
              draggableId={id}
              index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
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
                </div>
              )}
            </Draggable>
          )
        )}
      </div>
    );

  }


}

export default TodoItemList;