import React from 'react';
import './Form.css';

import CalendarIcon from '../assets/images/calendar-icon.png';

const Form = ({value, onChange, onCreate, onKeyPress, onCalendar}) => {
  return (
    <div className="form">
      <div className="task">
        <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
        <img className="cal-icon" onClick={onCalendar} src={CalendarIcon} alt='calendaricon'/>
        <div className="create-button" onClick={onCreate}>
          ADD TASK
        </div>
      </div>
      
      <div className="index-name">  
        <div className="contents">Contents</div>
        <div className="due-date">Due</div>
      </div>
    </div>

    
  );
};

export default Form;