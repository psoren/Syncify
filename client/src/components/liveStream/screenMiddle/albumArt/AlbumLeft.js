import React from 'react';
import './albums.scss';

const AlbumLeft = (props) => (
	<img
		className='side'
		src={props.albumSrc}
		alt='left album'
	/>
);

export default AlbumLeft;
