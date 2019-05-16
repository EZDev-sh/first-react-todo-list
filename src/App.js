import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import CalendarPopup from './components/CalendarPopup';

class App extends Component {
  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    date: new Date(),
    visible: false,
    input: '',
    due_date: '-',
    todos: [
      // { id: 0, text: ' 리액트 소개', checked: false },
      // { id: 1, text: ' 리액트 소개', checked: true },
      // { id: 2, text: ' 리액트 소개', checked: false }
    ]
  }


  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, todos, due_date } = this.state;
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

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      this.handleCreate();
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
      due_date: this.state.date.toString().substring(4,10)
    });

  }

  // 달력에서 선택한 날짜데이터 가져오기
  handleDate = date => this.setState({date})


  render() {
    const { input, todos, visible, date } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleOpenCalendar,
      handleCloseCalendar,
      handleDate,
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
          <TodoItemList todos={todos} />
        </TodoListTemplate>
        
        {/* Calendar 팝업창 on/off */}
        {visible ?
          <CalendarPopup
            date={date}
            changeDate={handleDate}
            onClose={handleCloseCalendar}

          />
          : null
        }

      </div>

    );
  }
}

export default App;