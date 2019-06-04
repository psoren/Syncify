import React from 'react';
import SongProgressBar from './SongProgressBar.js';
import HomeButton from './HomeButton.js';
import RoomName from './RoomName.js';
import RoomSettings from './RoomSettings';
import TogglePublic from './TogglePublic';
import './screenTop.scss';

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = { percentDone: 0 };
	}

	componentWillReceiveProps = (nextProps) =>
		this.setState({ percentDone: nextProps.percentDone });

	//Only show toggle public if the user is the creator
	render() {
		return (
			<div className='liveStreamTopOuter'>
				<div className='liveStreamTopInner'>
					<HomeButton />
					<RoomSettings />
					<RoomName roomName={this.props.roomName} />
					<TogglePublic
						isPublic={this.props.isPublic}
						isCreator={this.props.isCreator}
					/>
				</div>
				<SongProgressBar percentDone={this.state.percentDone} />
			</div>
		);
	}
}
