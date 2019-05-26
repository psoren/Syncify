import React from 'react';

const main = {
	color: '#2e3192',
	font: 'bold 4vw "helvetica neue"',
	position: 'relative',
	top: '25px',
	textAlign: 'center',
	maxWidth: '50%',
	paddingLeft: '25px'
}

export default class extends React.Component {
	render() {
		return (
			<div style={main}>
				<div>Welcome to</div>
				<div>Syncify</div>
			</div>
		);
	}
}
