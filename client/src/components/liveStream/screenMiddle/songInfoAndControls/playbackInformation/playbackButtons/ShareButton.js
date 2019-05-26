import React from 'react';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import 'styling/styles.scss';

const buttonStyle = {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    background: 'url(../share.svg)',
    backgroundSize: '100% 100%',
    border: 'none',
    margin: '4px 4px',
    outline: '0'
}

export default class extends React.Component {

    showRoomId = () => {
        let currentURL = new URL(window.location.href);
        let roomId = currentURL.searchParams.get('roomId');
        let message = 'Your room ID is ' + roomId +
            '.  Give it to your friends to have them join this room.';
        toaster.notify(message, { duration: 6000 });
    }

    render() {
        return (
            <button
                onClick={this.showRoomId}
                className='btn'
                style={buttonStyle}>
            </button>);
    }
}
