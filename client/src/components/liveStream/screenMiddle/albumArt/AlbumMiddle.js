import React from 'react';
import './albums.scss';

const AlbumMiddle = (props) => (
	<img
		src={props.albumSrc}
		className='middle'
		alt='middle album' />
);

export default AlbumMiddle;
