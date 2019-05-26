import React from 'react';

const imgStyle = {
	height: '300px',
	width: '300px'
}

const AlbumMiddle = (props) => (<img src={props.albumSrc} style={imgStyle} alt='middle album'/>);

export default AlbumMiddle
