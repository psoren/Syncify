import React from 'react';
import { Redirect } from 'react-router-dom';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import './joinCurrentRoomBtn.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { roomFound: false };
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

    onClick = async () => {
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

    render() {
        if (this.state.roomFound) {
            return (
                <Redirect to={'/livestream/?roomId=' + this.props.roomId} />
            );
        }
        else {
            return (
                <button
                    className='joinCurrentRoomBtn'
                    onClick={this.onClick}>
                    Join
            </button>
            );
        }
    }
}