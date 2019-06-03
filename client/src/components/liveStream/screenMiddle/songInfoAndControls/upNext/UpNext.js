import React from 'react';
import './upNext.scss';

export default (props) => (
    <div className='upNextOuter'>
        <div className='upNextInnerLeft'>
            <p className='upNextSong'>{props.song}</p>
            <p className='upNextArtist'>{props.artist}</p>
        </div>
        <img
            className='upNextImg'
            src={props.imgSrc}
            alt='Profile'
        />
    </div>
);