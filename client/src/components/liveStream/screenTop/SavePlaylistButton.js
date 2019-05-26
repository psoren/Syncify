import React from 'react';
import 'styling/styles.scss';

const unclickedStyle = {
    font: '16px arial, sans-serif',
    borderRadius: '1em',
    color: '#fff',
    background: '#2e3192',
    padding: '0.5em 0.5em',
    width: '7em',
    border: '1px solid white',
    outline: 'none'
}

const clickedStyle = {
    ...unclickedStyle,
    background: '#00005F'
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = { style: unclickedStyle }
    }

    onMouseOut = () => this.setState({ style: unclickedStyle });

    savePlaylist = async () => {
        this.setState({style: clickedStyle});
        console.log('save playlist');
    }

    render() {
        return (
            <button
                onMouseDown={this.onMouseDown}
                onMouseOut={this.onMouseOut}
                onClick={this.savePlaylist}
                className='btn'
                style={this.state.style}>
                Create Playlist
            </button>
        );
    }
}