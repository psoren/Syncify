import React from 'react';

const buttonStyle = {
	display: 'inline-block',
	width: '24px',
	height: '24px',
	background: 'url(../shuffle.svg)',
	backgroundSize: '100% 100%',
	border: 'none',
	margin: '4px 4px',
	outline: '0'
}

export default class extends React.Component {
	render() {
		return (
			<button onClick={this.props.onClick} style = {buttonStyle}></button>
		)
	}
}
