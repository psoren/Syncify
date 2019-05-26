import React from 'react';

const imgStyle = {
	height: '200px',
	width: '200px'
}

const AlbumLeft = (props) => (<img style = {imgStyle} src={props.albumSrc} alt='left album'/>);

export default AlbumLeft
