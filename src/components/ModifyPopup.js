import React, { Component } from 'react';
import './ModifyPopup.css'

import Calendar from './CalendarPopup'
import CalendarIcon from '../assets/images/calendar-icon.png';

class ModifyPopup extends Component {

    state = {
        modify_input: this.props.text,
        visibel: false,
        date: new Date(),
        due_date: this.props.date,
    }

    handleOpenCal = () => {
        this.setState({
            visibel: true
        })
    }

    handleCloseCal = () => {
        this.setState({
            visibel:false,
            due_date: '-'
        })
    }

    handleSelectCal = () => {
        this.setState ({
            visibel: false,
            due_date: this.state.date.toString().substring(4,10)
        });
      }

    handleDate = date => this.setState({date})

    // get input dom data
    handleChange = (e) => {
        this.setState({
            modify_input: e.target.value // input 의 다음 바뀔 값
        });
    }
    // enter key event
    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if (e.key === 'Enter') {
            this.props.onClose(this.props.id, this.state.modify_input, this.state.due_date)
        }
    }
    render() {
        const { modify_input, visibel, date, due_date } = this.state;
        const { onClose, onComplete, id } = this.props;
        const { handleKeyPress, 
            handleChange, 
            handleOpenCal, 
            handleCloseCal,
            handleSelectCal,
            handleDate
        } = this

        return (
            <div className="modify-popup">
                <div className="modify-content">
                    <div className='close-btn' onClick={onClose}>X</div>
                    <div className="bk">
                        <input value={modify_input} onChange={handleChange} onKeyPress={handleKeyPress} />
                        <img className="cal-icon" onClick={handleOpenCal} src={CalendarIcon} alt='calendaricon'/>
                    </div>
                    <div className="complete-button" onClick={() =>
                        onComplete(id, modify_input, due_date)
                    }>
                        Complete
                    </div>
                </div>

                {visibel ?
                    <Calendar 
                        date={date}
                        changeDate={handleDate}
                        onSelect={handleSelectCal}
                        onClose={handleCloseCal}
                    />
                    : null
                }
            </div>
        );
    }
}

export default ModifyPopup;