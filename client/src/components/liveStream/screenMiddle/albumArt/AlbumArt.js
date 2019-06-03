import React from 'react';
import './albums.scss';

export default (props) => (
	<div className='albumsOuter'>
		<img className='side' src={props.albumArt.albumLeft ?
			props.albumArt.albumLeft : '../notPlaying.jpg'}
			alt='Left Album' />
		<img className='middle'
			src={props.albumArt.albumMiddle ?
				props.albumArt.albumMiddle : '../notPlaying.jpg'}
			alt='Middle Album' />
		<img className='side' src={props.albumArt.albumRight ?
			props.albumArt.albumRight : '../notPlaying.jpg'}
			alt='Right Album' />
	</div>
);

