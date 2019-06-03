import React from 'react';
import LogoutButton from './LogoutButton';
import Logo from './Logo';
import Animation from './Animation';
import NowPlaying from './NowPlaying';
import './screenTop.scss';

export default (props) => (
    <div className='screenTopMain'>
        <LogoutButton />
        <div className='screenTopBottom'>
            <Logo />
            <NowPlaying
                playing={props.playing}
                paused={props.paused}
                songName={props.songName}
                songArtists={props.songArtists}
                albumArt={props.albumArt}
            />
            <Animation />
        </div>
        <hr className='screenTopHr' />
    </div>
);
