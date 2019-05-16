import React, { Component } from 'react';
import './CalendarPopup.css'
import Calendar from 'react-calendar';

class CalendarPopup extends Component {
    render() {
        const { date, changeDate, onClose } = this.props;
        return (
            <div className="popup">
                <div className="item-row">
                    <Calendar
                        onChange={changeDate}
                        value={date}
                    />
                    <div className="ok-button" onClick={onClose}>
                        OK
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarPopup;