import React from 'react';

const main = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '15px'
}

const pStyle = {
    font: 'bold 16px "helvetica neue", helvetica, arial, sans-serif',
    color: '#fff',
    width: '250px',
    textAlign: 'center'
}

const imgStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '2px solid white'
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumArt: props.albumArt,
            songName: props.songName,
            songArtists: props.songArtists
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.albumArt !== this.props.albumArt) {
            this.setState({
                albumArt: nextProps.albumArt,
                songName: nextProps.songName,
                songArtists: nextProps.songArtists
            });
        }
    }

    render() {
        if (this.props.playing) {
            return (<div style={main}>
                <p style={pStyle}>{this.state.songName} - {this.state.songArtists}</p>
                <img src={this.state.albumArt} height='150' width='150' style={imgStyle} alt='Album Art' />
            </div>);
        }
        else {
            return (<div style={main}>
                <p style={pStyle}>Nothing is playing</p>
                <img src='notPlaying.jpg' height='150' width='150' style={imgStyle} alt='Album Art' />
            </div>);
        }
    }
}
