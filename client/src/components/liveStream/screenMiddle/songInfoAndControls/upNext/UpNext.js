import React from 'react';

const imgStyle = {
    borderLeft: '1px solid white',
    maxWidth: '40%',
    paddingLeft: '10px',
    paddingRight: '10px'
}

const outer = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '75px',
}

const innerLeft = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    width: '60%'
}

const pStyle = {
    font: '14px arial, sans-serif',
    fontWeight: '900',
    color: '#fff',
    padding: 'none',
    margin: 'none'
}

export default class extends React.Component {
    render() {
        //Make things shorter if they are too long
        let song = this.props.song;
        let maxLength = 28;
        if(this.props.song.length > maxLength){
            song = this.props.song.slice(0, maxLength-3) + '...';
        }
        let artist = this.props.artist;
        if(this.props.artist.length > maxLength){
            artist = this.props.artist.slice(0, maxLength-3) + '...';
        }
        return (
            <div style={outer}>
                <div style={innerLeft}>
                    <div style={pStyle}>{song}</div>
                    <div style={pStyle}>{artist}</div>
                </div>
                <img src={this.props.imgSrc}
                    style={imgStyle}
                    alt='Profile'>
                </img>
            </div>
        );
    }
}