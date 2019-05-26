import React from 'react';
import './headerStyles.css';

const outer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    margin: '25px',
    padding: '10px',
    borderBottom: '1px solid white'
}

const innerUnselected = {
    font: 'bold 32px "helvetica neue", helvetica, arial, sans-serif',
    color: 'rgba(200,200,200,0.65)'
}

const innerSelected = {
    ...innerUnselected,
    borderBottom: '3px solid #2e3192',
    color: '#fff'
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 'track'}
    }

    songClicked = () => {
        this.setState({ selected: 'track' });
        this.props.changeOption('track');
    }

    artistClicked = () => { 
        this.setState({ selected: 'artist' });
        this.props.changeOption('artist');
    }

    playlistClicked = () => { 
        this.setState({ selected: 'playlist' });
        this.props.changeOption('playlist');
    }

    render() {
        return (
            <div style={outer}>
                <div className='innerItem'
                    style={this.state.selected === 'track' ?
                        innerSelected : innerUnselected}
                    onClick={this.songClicked}>
                    Songs</div>

                <div className='innerItem'
                    style={this.state.selected === 'artist' ?
                        innerSelected : innerUnselected}
                    onClick={this.artistClicked}>
                    Artists</div>

                <div className='innerItem'
                    style={this.state.selected === 'playlist' ?
                        innerSelected : innerUnselected}
                    onClick={this.playlistClicked}>
                    Playlists</div>
            </div>
        );
    }
}