import React from 'react';
import './albums.scss';

const AlbumRight = (props) => (
	<img
		className='side'
		src={props.albumSrc}
		alt='right album'
	/>
);

export default AlbumRight;
