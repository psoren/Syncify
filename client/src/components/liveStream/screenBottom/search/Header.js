import React from 'react';
import './header.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 'track' }
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
            <div className={'outer'}>
                <div className={this.state.selected === 'track' ?
                    'selected' : 'unselected'}
                    onClick={this.songClicked}>
                    Songs</div>
                <div className={this.state.selected === 'artist' ?
                    'selected' : 'unselected'}
                    onClick={this.artistClicked}>
                    Artists</div>

                <div className={this.state.selected === 'playlist' ?
                    'selected' : 'unselected'}
                    onClick={this.playlistClicked}>
                    Playlists</div>
            </div >
        );
    }
}