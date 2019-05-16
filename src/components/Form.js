import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress, onCalendar}) => {
  return (
    <div className="form">
      <div className="task">
        <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
        <div className="create-button" onClick={onCalendar}>
          Calendar
        </div>
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