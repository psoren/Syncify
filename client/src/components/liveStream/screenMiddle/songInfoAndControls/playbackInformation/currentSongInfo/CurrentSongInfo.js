import React from 'react';
import './currentSongInfo.scss';

export default (props) => (
	<div className='currentSongInfoMain'>
		<p className='currentSongLarge'>
			{props.playbackInfo ? props.playbackInfo.currentSongName : ''}
		</p>
		<p className='currentSongSmall'>
			{props.playbackInfo ? props.playbackInfo.currentSongArtist : ''}
		</p>
		<p className='currentSongSmall'>
			{props.playbackInfo ? props.playbackInfo.currentSongAlbum : ''}
		</p>
	</div>
);
