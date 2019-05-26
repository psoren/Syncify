import React from 'react';
import LogoutButton from './LogoutButton';
import Logo from './Logo';
import Animation from './Animation';
import NowPlaying from './NowPlaying';

const main = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const btnStyle = {
    position: 'relative',
    top: '15px',
    left: '15px',
    paddingBottom: '25px'
}

const bottom = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '150px',
    paddingBottom: '15px'
}

const hrStyle = {
    color: '#fff',
    border: '2px solid white',
    margin: '50px 50px 0 50px',
}

export default class extends React.Component {
    render() {
        return (
            <div style={main}>
                <div style={btnStyle}>
                    <LogoutButton />
                </div>
                <div style={bottom}>
                        <Logo />
                    <NowPlaying
                        playing={this.props.playing}
                        paused={this.props.paused}
                        songName={this.props.songName}
                        songArtists={this.props.songArtists}
                        albumArt={this.props.albumArt}
                    />
                    <Animation />
                </div>
                <hr style={hrStyle} />
            </div>
        )
    }
}
