import React, { Component } from 'react';
import './ModifyPopup.css'
import Calendar from './CalendarPopup'

class ModifyPopup extends Component {

    state = {
        modify_input: '',
        visibel: false,
        date: new Date(),
        due_date: '-',
    }

    handleOpenCal = () => {
        this.setState({
            visibel: true
        })
    }

    handleCloseCal = () => {
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
            this.props.onClose()
        }
    }
    render() {
        const { modify_input, visibel, date, due_date } = this.state;
        const { onClose, id } = this.props;
        const { handleKeyPress, 
            handleChange, 
            handleOpenCal, 
            handleCloseCal,
            handleDate
        } = this
        return (
            <div className="modify-popup">
                <div className="modify-content">
                    <div className="bk">
                        <input value={modify_input} onChange={handleChange} onKeyPress={handleKeyPress} />
                        <div className="cal-btn" onClick={handleOpenCal}>
                            Calendar
                        </div>
                    </div>
                    <div className="complete-button" onClick={() =>
                        onClose(id, modify_input, due_date)
                    }>
                        Complete
                    </div>
                </div>

                {visibel ?
                    <Calendar
                        date = {date}
                        changeDate={handleDate}
                        onClose={handleCloseCal}
                    />
                    : null
                }
            </div>
        );
    }
}

export default ModifyPopup;