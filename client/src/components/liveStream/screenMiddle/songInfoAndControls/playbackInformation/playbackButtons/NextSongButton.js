import React from 'react';
import 'styling/styles.scss';

const buttonStyle = {
	display: 'inline-block',
	width: '48px',
	height: '48px',
	background: 'url(../next.svg)',
	backgroundSize: '100% 100%',
	border: 'none',
	margin: '4px 4px',
	outline: '0'
}

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			socket: props.socket,
			loading: true
		};
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.socket) {
			this.setState({
				socket: nextProps.socket,
				loading: false
			});
		}
	}

	nextSong = () => {
		if (!this.state.loading) {
			let currentURL = new URL(window.location.href);
			this.state.socket.emit('nextSong', currentURL.searchParams.get('roomId'));
		}
	}

	render() {
		return (<button 
			onClick={this.nextSong} 
			className='btn'
			style={buttonStyle}></button>);
	}
}