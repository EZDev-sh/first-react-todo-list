import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import CalendarPopup from './components/CalendarPopup';
import NoneContentPopup from './components/NoneContentPopup';
import ModifyPopup from './components/ModifyPopup';


class App extends Component {
  id = 0;

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

  /**********************************************************************
   * TableItem 작업 관련 함수
   * TableItem의 수행 및 수행 해제 
   * TableItem을 제거
   **********************************************************************/
  // 테이블 아이템의 체크박스를 눌러 수행한것을 체크한다.
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

  // 선택한 테이블의 데이터를 지운다.
  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  /**********************************************************************
   * Form 작업 관련 함수
   * Form에서 작성된 데이터를 TableItem에 추가, input 데이터를 명시
   * keyevent 처리
   **********************************************************************/
  // 입력된 데이터 유지
  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }
  // enter key event
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // 데이터가 없으면 경고 메세지를 보여준다.
      if (this.state.input === '') {
        this.handleOpenNoneContent();
      }
      // 눌려진 키가 Enter 면 handleCreate 호출
      else {
        this.handleCreate();
      }
    }
  }
  // 새로운 테이블 아이템을 만든다.
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

  /**********************************************************************
   * CalendarPopup 작업 관련 함수
   * 달력을 명시하기위한
   **********************************************************************/

  // Calendar 팝업 띄우기
  handleOpenCalendar = () => {
    this.setState({
      visible: true
    });
  }

  // Calendar 팝업 닫기
  handleCloseCalendar = () => {
    this.setState({
      visible: false,
      due_date: '-',
    });
  }
  // Calendar 마감기한 선택시 기한을 저장하고 팝업닫기
  handleSelectDate = () => {
    this.setState({
      visible: false,
      due_date: this.state.date.toString().substring(4, 10)
    });
  }
  // 달력에서 선택한 날짜데이터 가져오기
  handleDate = date => this.setState({ date })


  /**********************************************************************
   * NoneContentPopup 작업 관련 함수
   * 데이터 입력없이 enter or add task 버튼을 눌렀을 경우 경고 메세지를 보내기위해
   **********************************************************************/

  // NoneContent 팝업 띄우기
  handleOpenNoneContent = () => {
    this.setState({
      input_check: true
    });
  }
  // NoneContetn 팝업 닫기
  handelCloseNoneContent = () => {
    this.setState({
      input_check: false,
    });
  }

  /**********************************************************************
   * ModifyPopup 작업 관련 함수
   * ModifyPopup에서 작성된 내용을 본 테이블에 반영한다.
   **********************************************************************/

  // 테이블 아이템이 수정이 이루어졌을때 
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

    // 변경된 내용 반영 및 팝업창을 닫는다.
    this.setState({
      todos: nextTodos,
      modify_visible: false
    });
  }
  // 수정 하려는 아이템 id 설정 및 팝업 창 연다.
  handleOpenModify = (id) => {
    this.setState({
      modify_visible: true,
      send_id: id,
    });
  }
  // 수정을 하지않고 창을 닫는다.
  handleCloseModify = () => {
    this.setState({
      modify_visible: false,
    })

  }




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
            text={todos[send_id].text}
            date={todos[send_id].due_date}
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