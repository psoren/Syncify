import React from 'react';
import './nowPlaying.scss';

export default (props) => (
    <div className='nowPlayingMain'>
        <p className='nowPlayingP'>
            {props.songName} -
            {props.songArtists}
        </p>
        <img
            src={props.albumArt ? props.albumArt : '/notPlaying.jpg'}
            className='nowPlayingImg'
            alt='Album Art'
        />
    </div>
);