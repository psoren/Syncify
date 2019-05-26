import React from 'react';

const outer = {
    display: 'flex',
    flexDirection: 'column'
}

const imgStyle = {
    width: '125px'
}

const nameStyle = {
    font: '20px arial, sans-serif',
    fontWeight: '900',
    color: '#fff'
}

export default class extends React.Component {

    playAlbum = () => console.log('(SelectedArtistAlbum) Play this album');

    /**
     * 
     *    let newAlbum = <SelectedArtistAlbum
                key={album.id}
                name={album.name}
                imgSrc={album.imgSrc}
                uri={album.uri}/>
     * 
     */


    render() {
        return (
            <div style={outer}>
                <img src={this.props.imgSrc} 
                onClick ={this.playAlbum}
                style={imgStyle} alt='Album'></img>
                <p style ={nameStyle}>
                {this.props.name}</p>
            </div>
        );
    }
}