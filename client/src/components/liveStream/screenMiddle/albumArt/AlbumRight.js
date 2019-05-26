import React from 'react';

const imgStyle = {
	height: '200px',
	width: '200px'
}

const AlbumRight = (props) => (<img src={props.albumSrc} style = {imgStyle} alt='right album'/>);

export default AlbumRight
