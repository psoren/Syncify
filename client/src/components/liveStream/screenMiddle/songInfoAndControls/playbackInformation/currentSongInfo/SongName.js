import React from 'react';

const pStyle = {
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: '1.5em',
	padding: 'none',
	margin: '0',
	color: '#fff'
}

export default class SongName extends React.Component{
	render(){
		return (
			<p style = {pStyle}>{this.props.name}</p>
		)
	}
}
