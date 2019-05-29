import React from 'react';

const buttonStyle = {
	display: 'inline-block',
	width: '48px',
	height: '48px',
	background: 'url(../leftArrow.svg)',
	backgroundSize: '100% 100%',
	border: 'none',
	margin: '4px 4px',
	outline: '0'
}

export default class extends React.Component {
	render() {
		return (
			<button
				onClick={this.props.onClick}
				style={buttonStyle}>
			</button>
		);
	}
}