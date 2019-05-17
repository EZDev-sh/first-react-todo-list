import React, { Component } from 'react';
import './NoneContentPopup.css';

class NoneContentPopup extends Component {
    render() {
        const { onClose } = this.props;
        return (
            <div className="none-content-popup">
                <div className="warring">
                    <div className="waring-content">해야할 일의 내용이 없습니다.</div>
                    <div className="check-button" onClick={onClose}>
                        OK
                    </div>
                </div>
            </div>
        );
    }
}

export default NoneContentPopup;