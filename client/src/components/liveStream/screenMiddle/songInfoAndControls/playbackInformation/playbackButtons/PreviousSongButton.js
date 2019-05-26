import React from 'react';
import 'styling/styles.scss';

const buttonStyle = {
	display: 'inline-block',
	width: '48px',
	height: '48px',
	background: 'url(../previous.svg)',
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

	prevSong = () => {
		if (!this.state.loading) {
			let currentURL = new URL(window.location.href);
			this.state.socket.emit('prevSong', currentURL.searchParams.get('roomId'));
		}
	}

	render() {
		return (<button 
			onClick={this.prevSong} 
			className='btn'
			style={buttonStyle}></button>);
	}
}