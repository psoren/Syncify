import React from 'react';

const pStyle = {
	fontFamily: 'Arial',
	fontSize: '1em',
	padding: 'none',
	margin: '0',
	color: '#fff'
}

export default class SongAlbum extends React.Component {
	render() {
		return (<p style={pStyle}>{this.props.name}</p>)
	}
}
