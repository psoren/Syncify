import React from 'react';
import SongProgressBar from './SongProgressBar.js';
import HomeButton from './HomeButton.js';
import RoomName from './RoomName.js';
import RoomSettings from './RoomSettings';
import './screenTop.scss';

//only for spacing right now
//we will add the gear to toggle public/private after
import Lock from './Lock';

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
				<div className='liveStreamTopInner'>
					<HomeButton />
					<RoomSettings />
					<RoomName roomName={this.props.roomName} />
					<Lock />
				</div>
				<SongProgressBar percentDone={this.state.percentDone} />
			</div>
		);
	}
}
