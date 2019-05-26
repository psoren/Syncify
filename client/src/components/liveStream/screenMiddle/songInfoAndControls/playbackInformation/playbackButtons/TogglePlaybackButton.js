import React from 'react';
import 'styling/styles.scss';

const pausedStyle = {
	display: 'inline-block',
	width: '48px',
	height: '48px',
	background: 'url(../pause.svg)',
	backgroundSize: '100% 100%',
	border: 'none',
	margin: '4px 4px',
	outline: '0'
}

const playStyle = {
	...pausedStyle,
	background: 'url(../play.svg)',
}

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			socket: props.socket,
			isPlaying: props.isPlaying,
			loading: true
		};
	}

	componentWillReceiveProps = (nextProps) => this.setState({
			loading: false,
			socket: nextProps.socket,
			isPlaying: nextProps.isPlaying
		});

	togglePlayback = () => {
		if (!this.state.loading) {
			let currentURL = new URL(window.location.href);
			this.state.socket.emit('togglePlayback', {
				roomId: currentURL.searchParams.get('roomId'),
				isPlaying: this.state.isPlaying
			});
		}
	}

	render() {
		return (<button
			className='btn'
			onClick={this.togglePlayback}
			style={this.state.isPlaying ? pausedStyle : playStyle}>
		</button>);
	}
}
