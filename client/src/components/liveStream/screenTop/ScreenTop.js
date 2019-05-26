import React from 'react';
import SongProgressBar from './SongProgressBar.js';
import HomeButton from './HomeButton.js';
//import SavePlaylistButton from './SavePlaylistButton';
import RoomName from './RoomName.js';

const outerMain = {
	display: 'flex',
	flexDirection: 'column',
	padding: '25px'
}

const bottom = {
	display: 'flex',
	flexDirection: 'row',
	width: '90%',
	textAlign: 'center'
}

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps({ percentDone }) {
		this.setState({ ...this.state, percentDone });
	}

	render() {
		return (
			<div style={outerMain}>
				<RoomName roomName={this.props.roomName} />
				<br />
				<div style={bottom}>
					<HomeButton />
					<SongProgressBar percentDone={this.state.percentDone} />
				</div>
			</div>
		)
	}
}
