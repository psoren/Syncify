import React from 'react';
import './playlist.scss';

export default class extends React.Component {

    setPlaylist = () =>
        this.props.setSelectedPlaylist(this.props.uri, this.props.name);

    render() {
        return (
            <div className='playlistOuter'
                onClick={this.setPlaylist}>
                <img
                    src={this.props.imgSrc}
                    className='playlist'
                    alt='Playlist'>
                </img>
                <div className='name'>
                    {this.props.name}
                </div>
            </div>
        );
    }
}