import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import CalendarPopup from './components/CalendarPopup';
import NoneContentPopup from './components/NoneContentPopup';
import ModifyPopup from './components/ModifyPopup';


class App extends Component {
  id = 0 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    date: new Date(),
    visible: false,
    modify_visible: false,
    input_check: false,
    input: '',
    due_date: '-',
    send_id: 0,
    todos: []
  }

  // table item click
  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  // talbe item remove
  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleOpenModify = (id) => {
    this.setState({
      modify_visible: true,
      send_id: id,
    });
  }

  handleCloseModify = () => {
    this.setState({
      modify_visible: false,
    })
    
  }

  handleCompleteModify = (id, content, change_date) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      text: content,
      due_date: change_date,
    };

    this.setState({
      todos: nextTodos,
      modify_visible: false
    });

    
  }

  // get input dom data
  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  // create new table item
  handleCreate = () => {
    const { input, todos, due_date } = this.state;
    console.log(input)
    if (input === '') {
      this.handleOpenNoneContent();
    }
    else {
      this.setState({
        // 다시 초기화
        input: '',
        due_date: '-',
        // concat 을 사용하여 배열에 추가
        todos: todos.concat({
          id: this.id++,
          text: input,
          due_date: due_date,
          checked: false
        })
      });
    }
  }

  // enter key event
  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      if (this.state.input === '') {
        this.handleOpenNoneContent();
      }
      else {
        this.handleCreate();
      }

    }
  }

  // calendar 팝업 띄우기
  handleOpenCalendar = () => {
    this.setState({
      visible: true
    });
  }

  // calendar 팝업 닫기 및 마무리 기한 변수에 넣기
  handleCloseCalendar = () => {
    this.setState({
      visible: false,
      due_date: '-',
    });
  }

  handleSelectDate = () => {
    this.setState({
      visible: false,
      due_date: this.state.date.toString().substring(4,10)
    });
  }

  // NoneContentPopup open
  handleOpenNoneContent = () => {
    this.setState({
      input_check: true
    });
  }

  // NoneContetnPopup close
  handelCloseNoneContent = () => {
    this.setState({
      input_check: false,
    });
  }

  // 달력에서 선택한 날짜데이터 가져오기
  handleDate = date => this.setState({ date })


  render() {
    const { send_id, input, todos, visible, date, input_check, modify_visible } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleOpenCalendar,
      handleCloseCalendar,
      handleDate,
      handleToggle,
      handleRemove,
      handelCloseNoneContent,
      handleOpenModify,
      handleCloseModify,
      handleSelectDate,
      handleCompleteModify,
    } = this;

    return (
      <div>
        <div className="title">TODO-LIST</div>
        <TodoListTemplate form={(
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
            onCalendar={handleOpenCalendar}
          />
        )}>
          <TodoItemList
            todos={todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
            onOpen={handleOpenModify}
          />

        </TodoListTemplate>

        {/* Calendar 팝업창 on/off */}
        {visible ?
          <CalendarPopup
            date={date}
            changeDate={handleDate}
            onSelect={handleSelectDate}
            onClose={handleCloseCalendar}

          />
          : null
        }

        {input_check ?
          <NoneContentPopup
            onClose={handelCloseNoneContent}
          />
          : null
        }
        {modify_visible ?
          <ModifyPopup
            id={send_id}
            onComplete={handleCompleteModify}
            onClose={handleCloseModify}
          />
          : null
        }
      </div>

    );
  }
}

export default App;