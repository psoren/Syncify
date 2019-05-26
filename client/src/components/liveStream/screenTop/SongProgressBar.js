import React from 'react';

const outer = {
	width: '100%',
	background: '#2e3192',
	height: '10px',
	margin: '20px',
	borderRadius: '5px'
};

export default class SongProgressBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = { percentDone: 0 };
	}

	componentWillReceiveProps({percentDone}) {
		this.setState({...this.state,percentDone});
	}

	render() {
		const inner = {
			width: `${this.state.percentDone * 100}%`,
			background: '#fff',
			padding: '0px 0px',
			height: '10px',
			borderRadius: '5px'
		};

		return (
			<div style={outer}>
				<div style={inner}></div>
			</div>
		)
	}
}
