import React, { Component } from 'react';
import './CalendarPopup.css'
import Calendar from 'react-calendar';

class CalendarPopup extends Component {
    render() {
        const { date, changeDate, onSelect, onClose } = this.props;
        return (
            <div className="popup">

                <div className="item-row">
                    <div className="close-button" onClick={onClose}>X</div>
                    <Calendar
                        onChange={changeDate}
                        value={date}
                    />
                    <div className="ok-button" onClick={onSelect}>
                        OK
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarPopup;