import React from 'react';
import './playlistImage.scss';

export default class extends React.Component {

    setPlaylist = () =>
        this.props.setSelectedPlaylist(this.props.uri, this.props.name);

    render() {
        return (
            <div className='playlistImageOuter'
                onClick={this.setPlaylist}>
                <img
                    src={this.props.imgSrc}
                    className='playlist'
                    alt='Playlist'>
                </img>
                <div className='title'>
                    {this.props.name}
                </div>
            </div>
        );
    }
}