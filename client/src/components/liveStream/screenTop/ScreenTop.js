import React from 'react';
import SongProgressBar from './SongProgressBar.js';
import HomeButton from './HomeButton.js';
import RoomName from './RoomName.js';
import './screenTop.scss';

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = { percentDone: 0 };
	}

	componentWillReceiveProps = (nextProps) =>
		this.setState({ percentDone: nextProps.percentDone });

	render() {
		return (
			<div className='liveStreamTopOuter'>
				<RoomName roomName={this.props.roomName} />
				<HomeButton />
				<SongProgressBar percentDone={this.state.percentDone} />
			</div>
		);
	}
}
