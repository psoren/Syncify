import React from 'react';
import { Redirect } from 'react-router-dom';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'styling/styles.scss';
import './currentRooms.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                textAlign: 'center',
                font: 'bold 24px "helvetica neue", helvetica, arial, sans-serif',
                borderRadius: '1.5em',
                background: '#2e3192',
                color: 'white',
                width: '3em',
                height: '3em',
                border: '1px solid white',
                outline: 0
            },
            roomFound: false
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch('/joinRoom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomId: this.state.roomId,
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken')
            })
        });
        let resJSON = await res.json();

        if (resJSON.success) {
            this.setState({ roomFound: true });
        }
        else {
            toaster.notify("We couldn't find the room with id '" + this.state.roomId + "'", { duration: 2000 });
        }
    }

    onClick = async (e) => {
        this.setState({ style: { ...this.state.style, background: '#2e3192' } });
        let res = await fetch('/joinRoom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomId: this.props.roomId,
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken')
            })
        });
        let resJSON = await res.json();
        if (resJSON.success) {
            this.setState({ roomFound: true });
        }
        else {
            toaster.notify("We couldn't find the room with id '" + this.state.roomId + "'", { duration: 2000 });
        }
    }

    onMouseDown = () => this.setState({ style: { ...this.state.style, background: '#00005F' } });
    onMouseOut = () => this.setState({ style: { ...this.state.style, background: '#2e3192' } });

    render() {
        if (this.state.roomFound) {
            return (<Redirect to={'/livestream/?roomId=' + this.props.roomId} />);
        }
        else {
            return (<button
                style={this.state.style}
                className='currentRoomBtn'
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}
                onMouseOut={this.onMouseOut}>
                Join
            </button>);
        }
    }
}