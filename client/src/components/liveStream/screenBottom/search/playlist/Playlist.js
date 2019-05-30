import React from 'react';
import './playlist.scss';

const outer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

const imgStyle = {
    width: '125px'
}

const nameStyle = {
    font: '20px arial, sans-serif',
    fontWeight: '900',
    color: '#fff',
    marginTop: '10px'
}

export default class extends React.Component {

    setPlaylist = () => this.props.setSelectedPlaylist(this.props.uri, this.props.name);

    render() {
        return (
            <div style={outer}
                className='playlistAlbum'>
                <div className='imageWrapper'
                    onClick={this.setPlaylist}>
                    <img
                        src={this.props.imgSrc}
                        style={imgStyle}
                        alt='Playlist'>
                    </img>
                </div>
                <div style={nameStyle}>
                    {this.props.name}
                </div>
            </div>
        );
    }
}